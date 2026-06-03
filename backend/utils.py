import io
import os
import json
import re
import pandas as pd
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from google import genai
from dotenv import load_dotenv

load_dotenv()

# ─── Gemini Setup ───────────────────────────────────────────────
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY", "")

# ─── PDF Text Extraction ─────────────────────────────────────────
def extract_text_from_pdf(contents: bytes) -> str:
    try:
        import PyPDF2
        reader = PyPDF2.PdfReader(io.BytesIO(contents))
        text = ""
        for page in reader.pages:
            text += page.extract_text() or ""
        return text.strip()
    except Exception as e:
        print(f"PDF extraction error: {e}")
        return ""

# ─── Skill Keywords ──────────────────────────────────────────────
SKILL_KEYWORDS = [
    "python", "java", "javascript", "typescript", "react", "node", "express",
    "fastapi", "django", "flask", "sql", "mysql", "mongodb", "firebase",
    "postgresql", "html", "css", "tailwind", "bootstrap", "git", "github",
    "docker", "kubernetes", "aws", "azure", "gcp", "machine learning",
    "deep learning", "nlp", "computer vision", "tensorflow", "pytorch",
    "scikit-learn", "pandas", "numpy", "matplotlib", "seaborn", "opencv",
    "mediapipe", "bert", "transformers", "next.js", "vue", "angular",
    "redux", "graphql", "rest api", "websocket", "linux", "c", "c++",
    "kotlin", "swift", "flutter", "dart", "r", "matlab", "hadoop",
    "spark", "tableau", "power bi", "excel", "figma", "postman"
]

# ─── Extract Skills ───────────────────────────────────────────────
def extract_skills(text: str) -> list:
    text_lower = text.lower()
    found = [skill for skill in SKILL_KEYWORDS if skill in text_lower]
    return list(set(found))

# ─── Extract Projects ─────────────────────────────────────────────
def extract_projects(text: str) -> list:
    projects = []
    lines = text.split('\n')
    capture = False
    for line in lines:
        line = line.strip()
        if any(kw in line.lower() for kw in ["project", "projects", "work experience"]):
            capture = True
        elif capture and line and len(line) > 10:
            projects.append(line)
            if len(projects) >= 5:
                break
    return projects

# ─── Extract Courses ──────────────────────────────────────────────
def extract_courses(text: str) -> list:
    courses = []
    lines = text.split('\n')
    capture = False
    for line in lines:
        line = line.strip()
        if any(kw in line.lower() for kw in ["course", "certification", "training", "education"]):
            capture = True
        elif capture and line and len(line) > 5:
            courses.append(line)
            if len(courses) >= 5:
                break
    return courses

# ─── TF-IDF Matching Score ────────────────────────────────────────
def get_matching_score(resume_text: str, job_description: str) -> float:
    try:
        if not resume_text or not job_description:
            return 0.0
        vectorizer = TfidfVectorizer(stop_words='english')
        vectors = vectorizer.fit_transform([resume_text, job_description])
        score = cosine_similarity(vectors[0], vectors[1])[0][0]
        return round(float(score) * 100, 2)
    except Exception as e:
        print(f"Matching score error: {e}")
        return 0.0

# ─── Load CSV Data ────────────────────────────────────────────────
def load_csv_data(path: str, type: str = 'internship') -> list:
    try:
        if not os.path.exists(path):
            return []
        df = pd.read_csv(path)
        if 'type' in df.columns:
            df = df[df['type'].str.lower() == type.lower()]
        return df.to_dict(orient='records')
    except Exception as e:
        print(f"CSV load error: {e}")
        return []

# ─── Gemini Resume Extraction ─────────────────────────────────────
def extract_resume_data_gemini(text: str) -> dict:
    try:
        if not GEMINI_API_KEY or not text:
            return {}
        client = genai.Client(api_key=GEMINI_API_KEY)
        prompt = f"""
        Extract the following from this resume text and return ONLY a valid JSON object:
        {{
            "skills": ["skill1", "skill2"],
            "projects": ["project1", "project2"],
            "courses": ["course1", "course2"]
        }}
        Resume Text:
        {text[:3000]}
        Return ONLY the JSON object, no explanation, no markdown.
        """
        response = client.models.generate_content(
           model="gemini-2.0-flash-lite",
            contents=prompt
        )
        raw = response.text.strip()
        raw = raw.replace("```json", "").replace("```", "").strip()
        return json.loads(raw)
    except Exception as e:
        print(f"Gemini extraction error: {e}")
        return {}

# ─── Phishing / Threat Scanner ────────────────────────────────────
PHISHING_KEYWORDS = [
    "free job", "guaranteed salary", "work from home offer", "urgent hiring",
    "no experience needed", "earn money fast", "click here to apply",
    "verify your account", "limited offer", "winner", "congratulations",
    "claim your reward", "bank details", "otp", "password reset",
    "suspicious", "malware", "phishing", "scam", "fraud"
]

SUSPICIOUS_TLDS = [".xyz", ".tk", ".ml", ".ga", ".cf", ".gq", ".top", ".click", ".loan"]

SAFE_DOMAINS = [
    "linkedin.com", "naukri.com", "indeed.com", "glassdoor.com",
    "internshala.com", "google.com", "github.com", "microsoft.com",
    "amazon.com", "infosys.com", "tcs.com", "wipro.com"
]

def scan_text(content: str, phishing_urls: list, spam_messages: list) -> dict:
    content_lower = content.lower().strip()
    risk_score = 0
    reasons = []

    for url in phishing_urls:
        if str(url).lower() in content_lower:
            risk_score += 50
            reasons.append("Matched known phishing URL database")
            break

    for msg in spam_messages:
        if str(msg).lower() in content_lower:
            risk_score += 40
            reasons.append("Matched known spam message pattern")
            break

    matched_keywords = [kw for kw in PHISHING_KEYWORDS if kw in content_lower]
    if matched_keywords:
        risk_score += len(matched_keywords) * 10
        reasons.append(f"Suspicious keywords found: {', '.join(matched_keywords[:3])}")

    for tld in SUSPICIOUS_TLDS:
        if tld in content_lower:
            risk_score += 20
            reasons.append(f"Suspicious domain extension: {tld}")
            break

    for domain in SAFE_DOMAINS:
        if domain in content_lower:
            risk_score = max(0, risk_score - 30)
            reasons.append(f"Trusted domain detected: {domain}")
            break

    if len(content) > 100 and "http" in content_lower:
        risk_score += 10
        reasons.append("Unusually long URL detected")

    ip_pattern = re.compile(r'http[s]?://\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}')
    if ip_pattern.search(content):
        risk_score += 30
        reasons.append("IP address used instead of domain name")

    if risk_score >= 60:
        status = "PHISHING"
        message = "⚠️ High Risk! This appears to be a phishing attempt."
    elif risk_score >= 30:
        status = "SUSPICIOUS"
        message = "⚠️ Suspicious content detected. Proceed with caution."
    else:
        status = "SAFE"
        message = "✅ No major threats detected."

    return {
        "status": status,
        "risk_score": min(risk_score, 100),
        "message": message,
        "reasons": reasons if reasons else ["No threats detected"]
    }