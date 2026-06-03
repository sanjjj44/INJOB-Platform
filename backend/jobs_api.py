import os
import requests
from dotenv import load_dotenv

load_dotenv()

ADZUNA_APP_ID = os.getenv("ADZUNA_APP_ID", "")
ADZUNA_APP_KEY = os.getenv("ADZUNA_APP_KEY", "")

def get_live_jobs(query: str = "developer", location: str = "us", max_results: int = 30) -> list:
    try:
        if not ADZUNA_APP_ID or not ADZUNA_APP_KEY:
            print("Adzuna API keys not found. Using offline fallback.")
            return []

        # Map location to Adzuna country code
        country_map = {
            "us": "us", "in": "in", "gb": "gb",
            "uk": "gb", "au": "au", "ca": "ca",
            "india": "in", "usa": "us"
        }
        country = country_map.get(location.lower(), "us")

        url = f"https://api.adzuna.com/v1/api/jobs/{country}/search/1"
        params = {
            "app_id": ADZUNA_APP_ID,
            "app_key": ADZUNA_APP_KEY,
            "results_per_page": max_results,
            "what": query,
            "content-type": "application/json"
        }

        response = requests.get(url, params=params, timeout=10)
        response.raise_for_status()
        data = response.json()

        jobs = []
        for item in data.get("results", []):
            jobs.append({
                "title": item.get("title", "Unknown Role"),
                "company": item.get("company", {}).get("display_name", "Unknown Company"),
                "location": item.get("location", {}).get("display_name", "Remote"),
                "description": item.get("description", ""),
                "url": item.get("redirect_url", "#"),
                "category": item.get("category", {}).get("label", "General"),
                "salary_min": item.get("salary_min", 0),
                "salary_max": item.get("salary_max", 0)
            })
        return jobs

    except Exception as e:
        print(f"Adzuna API error: {e}")
        return []