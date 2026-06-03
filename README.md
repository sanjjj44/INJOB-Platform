# INJOB - Intelligent Job & Internship Matchmaker

![INJOB Platform](https://img.shields.io/badge/Status-Active-success)
![React](https://img.shields.io/badge/Frontend-React%20%2B%20Vite-blue)
![FastAPI](https://img.shields.io/badge/Backend-FastAPI-teal)
![Python](https://img.shields.io/badge/Python-3.13-yellow)

**INJOB** is a modern, AI-powered platform designed to seamlessly connect job seekers and students with their ideal internships and career opportunities. Built with a stunning cybernetic/glassmorphism UI, INJOB goes beyond traditional job boards by utilizing advanced Natural Language Processing (NLP) and Google's Gemini AI to parse resumes, match skills, and even protect users from phishing and job scams.

## 🌟 Key Features

1. **AI-Powered Resume Analysis**: 
   - Upload your resume (PDF) and INJOB uses **Google Gemini AI** (or fallback NLP) to extract your skills, projects, and educational courses.
2. **Smart Skill Matching (TF-IDF)**: 
   - Uses `scikit-learn` to vectorize your resume against live job descriptions, returning a highly accurate **Cosine Similarity Match Score**.
3. **Live Job & Internship Aggregation**: 
   - Searches through offline datasets and live APIs to recommend the most relevant opportunities.
4. **Universal Threat & Phishing Scanner**: 
   - A built-in security tool that scans job links, emails, and messages against known spam keywords, suspicious TLDs, and known malicious databases to protect candidates from scams.
5. **Interactive AI Chatbot**: 
   - A rule-based smart assistant to guide you through interview preparation, salary insights, resume building, and job search strategies.
6. **Cybernetic UI**: 
   - Built with React, Tailwind CSS, and Framer Motion, featuring smooth micro-animations, glassmorphism panels, and a sleek dark-mode aesthetic.

---

## 📸 Screenshots

<div align="center">
  <img src="screenshots/1.png" alt="Dashboard" width="800"/>
  <br/>
  <em>Main Dashboard & Intelligence Suite</em>
  <br/><br/>
  <img src="screenshots/2.png" alt="Job Search" width="800"/>
  <br/>
  <em>AI Job Search & Resume Upload</em>
  <br/><br/>
  <img src="screenshots/3.png" alt="Threat Scanner" width="800"/>
  <br/>
  <em>Universal Threat & Phishing Scanner</em>
  <br/><br/>
  <img src="screenshots/4.png" alt="Resume Builder" width="800"/>
  <br/>
  <em>Neural Asset (Resume) Builder</em>
  <br/><br/>
  <img src="screenshots/5.png" alt="Community" width="800"/>
  <br/>
  <em>Community Feed & Insights</em>
</div>

---

## 🛠️ Technology Stack

### Frontend
- **Framework**: React (via Vite)
- **Styling**: Tailwind CSS, Custom Vanilla CSS (for cybernetic glowing effects)
- **Animations**: Framer Motion
- **Routing**: React Router DOM
- **Icons**: React Icons
- **Backend Communication**: Axios

### Backend
- **Framework**: FastAPI (Python)
- **Server**: Uvicorn
- **AI & NLP**: Google GenAI SDK (`google-genai`), Scikit-Learn (TF-IDF), PyPDF2 (Text Extraction)
- **Data Handling**: Pandas, NumPy
- **Security**: CORS Middleware, Custom API Keys

---

## 🚀 Getting Started

Follow these instructions to set up the project locally on your machine.

### Prerequisites
- **Node.js** (v16 or higher)
- **Python** (3.10 or higher)
- **Git**

---

### 1. Backend Setup

The backend handles the AI processing, resume parsing, and API endpoints.

1. **Open a terminal** and navigate to the backend folder:
   ```powershell
   cd C:\Users\Asha\Documents\INJOB\backend
   ```
2. **Create a virtual environment**:
   ```powershell
   python -m venv venv
   ```
3. **Activate the virtual environment**:
   - On Windows (PowerShell):
     ```powershell
     .\venv\Scripts\activate
     ```
   - On Mac/Linux:
     ```bash
     source venv/bin/activate
     ```
4. **Install the dependencies**:
   ```powershell
   pip install -r requirements.txt
   ```
5. **Set up Environment Variables**:
   Create a `.env` file inside the `backend` folder and add your API keys:
   ```env
   GEMINI_API_KEY=your_google_gemini_api_key_here
   API_KEY=your_custom_security_key
   ```
6. **Run the FastAPI Server**:
   ```powershell
   uvicorn main:app --reload
   ```
   *(The backend API will run at `http://localhost:8000`)*

---

### 2. Frontend Setup

The frontend provides the beautiful, interactive user interface.

1. **Open a new terminal window** (keep the backend running) and navigate to the frontend folder:
   ```powershell
   cd C:\Users\Asha\Documents\INJOB\frontend
   ```
2. **Install Node modules**:
   ```powershell
   npm install
   ```
3. **Run the Development Server**:
   ```powershell
   npm run dev
   ```
   *(The frontend app will run at `http://localhost:5173` or similar port provided by Vite)*

---

## 📂 Project Structure

```
INJOB/
│
├── backend/                  # Python FastAPI Server
│   ├── data/                 # Datasets, JSON stats, and uploaded resumes
│   ├── venv/                 # Python Virtual Environment
│   ├── main.py               # Main API Application (Endpoints)
│   ├── utils.py              # Helper functions (Gemini, TF-IDF, Scanner)
│   ├── jobs_api.py           # External Job API Integrations
│   ├── requirements.txt      # Python dependencies
│   └── .env                  # Backend secrets (ignored in git)
│
├── frontend/                 # React Vite Application
│   ├── src/                  # React Components, Pages, and Assets
│   ├── public/               # Static assets
│   ├── package.json          # Node dependencies & scripts
│   ├── index.css             # Global Tailwind & Cybernetic styles
│   └── vite.config.js        # Vite configuration
│
└── README.md                 # Project Documentation
```

## ⚠️ Troubleshooting

**"Fatal error in launcher: Unable to create process"**
If you copied the project from another drive (like `D:\`), Python's virtual environment gets broken because it hardcodes absolute paths. To fix this:
1. Delete the `backend/venv` folder.
2. Re-run `python -m venv venv`.
3. Activate it and re-run `pip install -r requirements.txt`.

**"ImportError: cannot import name 'genai' from 'google'"**
Make sure you are using the new official Google SDK. Run `pip uninstall google-generativeai` and then `pip install google-genai`.

---
*Built with ❤️ for the future of job hunting.*
