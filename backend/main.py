import json
import os
import shutil
from dotenv import load_dotenv
import pandas as pd
from fastapi import FastAPI, UploadFile, File, Form, Depends, HTTPException, status
from fastapi.security import APIKeyHeader
from fastapi.middleware.cors import CORSMiddleware
from typing import List, Optional
from fastapi.staticfiles import StaticFiles
from utils import extract_text_from_pdf, extract_skills, extract_projects, extract_courses, get_matching_score, scan_text, load_csv_data, extract_resume_data_gemini
from jobs_api import get_live_jobs

load_dotenv()

API_KEY_NAME = "x-api-key"
API_KEY = os.getenv("API_KEY", "default_secret_key_12345")
api_key_header = APIKeyHeader(name=API_KEY_NAME, auto_error=False)

def get_api_key(api_key_header: str = Depends(api_key_header)):
    if api_key_header == API_KEY:
        return api_key_header
    raise HTTPException(
        status_code=status.HTTP_403_FORBIDDEN,
        detail="Could not validate API key"
    )

app = FastAPI(title="INJOB - Internship & Job Skill Matchmaker")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

UPLOAD_DIR = os.path.join(os.path.dirname(__file__), "data", "uploads")
os.makedirs(UPLOAD_DIR, exist_ok=True)
app.mount("/api/uploads", StaticFiles(directory=UPLOAD_DIR), name="uploads")

DATA_DIR = os.path.join(os.path.dirname(__file__), "data")
INTERNSHIPS_CSV = []
JOBS_CSV = []
PHISHING_URLS = []
SPAM_MESSAGES = []
COMPANY_STATS = []

def load_json(filename):
    path = os.path.join(DATA_DIR, filename)
    if os.path.exists(path):
        with open(path, "r") as f:
            return json.load(f)
    return []

def load_all_datasets():
    global INTERNSHIPS_CSV, JOBS_CSV, PHISHING_URLS, SPAM_MESSAGES, COMPANY_STATS
    DATA_PATH = os.path.join(DATA_DIR, "data.csv")
    INTERNSHIPS_CSV = load_csv_data(DATA_PATH, type='internship')
    JOBS_CSV = load_csv_data(DATA_PATH, type='job')
    PHISHING_URLS = load_json("phishing_urls.json")
    SPAM_MESSAGES = load_json("spam_messages.json")
    COMPANY_STATS = load_json("company_stats.json")

    if not INTERNSHIPS_CSV:
        try:
            backup_path = os.path.join(DATA_DIR, "internships.json")
            if os.path.exists(backup_path):
                with open(backup_path, "r", encoding="utf-8") as f:
                    backup_data = json.load(f)
                mapped_data = []
                for item in backup_data:
                    mapped_data.append({
                        "position": item.get("title", "Software Engineering Intern"),
                        "company": item.get("company", "INJOB Secure AI"),
                        "location": item.get("location", "Remote"),
                        "Job Description": item.get("description", "React and FastAPI engineering role."),
                        "industry": "Technology",
                        "url": "#"
                    })
                INTERNSHIPS_CSV = mapped_data
                JOBS_CSV = mapped_data
        except Exception as e:
            print(f"Failed to load internships.json fallback: {e}")

    print(f"Loaded {len(INTERNSHIPS_CSV)} internships.")
    print(f"Loaded {len(JOBS_CSV)} jobs.")

load_all_datasets()

@app.get("/")
async def root():
    return {"message": "INJOB Core is Online"}

@app.post("/upload-resume")
async def upload_resume(file: UploadFile = File(...)):
    contents = await file.read()
    text = extract_text_from_pdf(contents)
    ai_data = extract_resume_data_gemini(text)
    if ai_data:
        skills = ai_data.get("skills", [])
        projects = ai_data.get("projects", [])
        courses = ai_data.get("courses", [])
    else:
        skills = extract_skills(text)
        projects = extract_projects(text)
        courses = extract_courses(text)
    return {
        "filename": file.filename,
        "skills": skills,
        "projects": projects,
        "courses": courses,
        "resume_text": text,
        "text_preview": text[:1000] + "..." if len(text) > 1000 else text
    }

@app.post("/api/live-match")
async def live_match(
    resume_text: str = Form(...),
    skills: str = Form("developer"),
    location: str = Form("us"),
    mode: str = Form("job")
):
    query = "developer"
    skill_list = [s.strip() for s in skills.split(',') if s.strip()]
    if skill_list:
        query = " ".join(skill_list[:2])
    if mode == "internship":
        query = f"{query} internship"

    live_opportunities = get_live_jobs(query=query, location=location, max_results=30)

    results = []
    if not live_opportunities:
        dataset = INTERNSHIPS_CSV if mode == "internship" else JOBS_CSV
        for item in dataset:
            desc = str(item.get('Job Description', '')) + " " + str(item.get('position', '')) + " " + str(item.get('location', ''))
            score = get_matching_score(resume_text, desc)
            if score > 0:
                results.append({
                    "title": item.get('position', 'Unknown Title'),
                    "company": item.get('company', 'Unknown Company'),
                    "location": item.get('location', 'Remote'),
                    "url": item.get('url', '#'),
                    "score": round(score, 2),
                    "explanation": f"Offline Dataset. Industry: {item.get('industry', 'General')}."
                })
        return sorted(results, key=lambda x: x['score'], reverse=True)[:15]

    for item in live_opportunities:
        desc = str(item.get('description', '')) + " " + str(item.get('title', ''))
        score = get_matching_score(resume_text, desc)
        if score > 0:
            results.append({
                "title": item.get('title', 'Unknown Role'),
                "company": item.get('company', 'Unknown Enterprise'),
                "location": item.get('location', 'Remote'),
                "url": item.get('url', '#'),
                "score": round(score, 2),
                "explanation": f"Live {mode.capitalize()} Match via Adzuna API."
            })

    return sorted(results, key=lambda x: x['score'], reverse=True)[:15]

@app.post("/scan")
async def scan_universal(content: str = Form(...)):
    result = scan_text(content, PHISHING_URLS, SPAM_MESSAGES)
    return result

@app.get("/analytics")
async def get_analytics():
    return COMPANY_STATS
@app.post("/chat")
async def chat(request: dict):
    message = request.get("message", "").lower().strip()
    if not message:
        return {"response": "Please ask me something!"}

    # Smart rule-based responses
    if any(w in message for w in ["resume", "cv"]):
        return {"response": "📄 Resume Tips:\n\n1. Use clear section headers (Skills, Education, Experience, Projects)\n2. Add quantifiable achievements (e.g. 'Built ML model with 94% accuracy')\n3. Include relevant technical skills as keywords\n4. Keep it to 1-2 pages\n5. Save as PDF before uploading to INJOB for best results!"}

    elif any(w in message for w in ["skill", "learn", "technology"]):
        return {"response": "🧠 In-Demand Skills 2025:\n\n• AI/ML: Python, TensorFlow, PyTorch\n• Web Dev: React, FastAPI, Node.js\n• Cloud: AWS, Azure, GCP\n• Data: SQL, Pandas, Power BI\n• DevOps: Docker, Kubernetes, Git\n\nFocus on building projects with these skills!"}

    elif any(w in message for w in ["interview", "prepare"]):
        return {"response": "🎯 Interview Preparation:\n\n1. Research the company thoroughly\n2. Practice DSA on LeetCode\n3. Prepare STAR method answers\n4. Review your projects deeply\n5. Prepare 5 questions to ask the interviewer\n6. Practice mock interviews out loud!"}

    elif any(w in message for w in ["job", "search", "find", "apply"]):
        return {"response": "🔍 Job Search Strategy:\n\n1. Upload your resume on INJOB for AI matching\n2. Apply to at least 10 jobs per week\n3. Customize your resume for each role\n4. Network on LinkedIn actively\n5. Follow up after 1 week of applying\n6. Use INJOB Threat Scanner to verify job links!"}

    elif any(w in message for w in ["internship"]):
        return {"response": "🎓 Internship Tips:\n\n1. Start applying in your 2nd year\n2. Check Internshala, LinkedIn, INJOB\n3. Build 2-3 strong projects first\n4. Get certifications (AWS, Google, NPTEL)\n5. Cold email companies directly\n6. Use INJOB internship matching for best results!"}

    elif any(w in message for w in ["phishing", "fake", "scam", "fraud"]):
        return {"response": "🛡️ Stay Safe from Job Scams:\n\n1. Use INJOB Universal Scanner to verify URLs\n2. Never pay money for a job/internship\n3. Verify company on LinkedIn before applying\n4. Be suspicious of offers with no interview\n5. Never share OTP or bank details\n6. Check email domain carefully!"}

    elif any(w in message for w in ["match", "score", "accuracy"]):
        return {"response": "⚡ How INJOB Matching Works:\n\n1. Upload your PDF resume\n2. AI extracts your skills using NLP\n3. TF-IDF converts text to vectors\n4. Cosine Similarity compares with job descriptions\n5. Jobs are ranked by match score %\n\nHigher score = better skill alignment!"}

    elif any(w in message for w in ["hello", "hi", "hey", "help"]):
        return {"response": "👋 Hello! I am INJOB AI Assistant!\n\nI can help you with:\n• 📄 Resume improvement tips\n• 🔍 Job search strategies\n• 🎯 Interview preparation\n• 🛡️ Phishing detection advice\n• 🧠 In-demand skills guide\n• ⚡ How INJOB matching works\n\nWhat would you like to know?"}

    elif any(w in message for w in ["salary", "package", "ctc", "pay"]):
        return {"response": "💰 Salary Insights 2025 (India):\n\n• Fresher Software Engineer: ₹3-8 LPA\n• Data Scientist (0-2 yrs): ₹4-10 LPA\n• Full Stack Developer: ₹4-12 LPA\n• ML Engineer: ₹5-15 LPA\n• Top MNCs (TCS/Infosys): ₹3.5-7 LPA\n• Startups: Variable + ESOPs\n\nFocus on skills over package initially!"}

    elif any(w in message for w in ["linkedin", "profile", "network"]):
        return {"response": "🔗 LinkedIn Profile Tips:\n\n1. Professional headshot photo\n2. Compelling headline with skills\n3. Detailed About section with keywords\n4. Add all projects with descriptions\n5. Get 3+ recommendations\n6. Post content weekly\n7. Connect with 500+ professionals\n8. Follow target companies!"}

    else:
        return {"response": f"🤖 Thanks for your question about '{request.get('message', '')}'\n\nI can help you with:\n• Resume tips → ask 'how to improve my resume'\n• Job search → ask 'how to find jobs'\n• Skills guide → ask 'what skills to learn'\n• Interview prep → ask 'how to prepare for interview'\n• Salary info → ask 'what is the salary'\n• Safety tips → ask 'how to detect fake jobs'\n\nTry asking one of these!"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)