from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from backend.database import initialize_db, insert_analysis_result, get_all_results
from backend.vision_api import call_openai_api
import logging


app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


initialize_db()


logging.basicConfig(level=logging.INFO)


@app.post("/analyze/")
async def analyze_image(file: UploadFile):
    try:
        image_content = await file.read()
        print(f"Uploaded Image Size: {len(image_content)} bytes")

        prompt = """
        Analyze this image for safety compliance. Provide:
        - Number of workers visible.
        - Presence or absence of hardhats.
        - Presence or absence of hi-vis vests.
        """

        analysis_result = call_openai_api(image_content, prompt)

        return {"result": analysis_result}

    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Unexpected error: {e}")



@app.get("/history/")
async def fetch_history():
    try:
        results = get_all_results()
        return {"status": "success", "data": results}
    except Exception as e:
        logging.error(f"Error fetching history: {e}")
        raise HTTPException(status_code=500, detail=f"Error fetching history: {e}")


def determine_risk_level(analysis_result: dict) -> str:
    hardhats = analysis_result.get("hardhats", "absent").lower()
    hi_vis_vests = analysis_result.get("hi_vis_vests", "absent").lower()

    if hardhats == "absent" and hi_vis_vests == "absent":
        return "High Risk"
    elif hardhats == "present" and hi_vis_vests == "present":
        return "Compliant"
    else:
        return "Medium Risk"
