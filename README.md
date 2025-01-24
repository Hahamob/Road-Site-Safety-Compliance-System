# Road Site Safety Compliance System

This project is a web-based system for analyzing safety compliance on construction sites using image recognition powered by OpenAI Vision API. The system evaluates safety compliance by identifying the presence/absence of hardhats, hi-vis vests, and worker counts in uploaded images. It categorizes risk levels as "High Risk," "Medium Risk," or "Compliant" based on detected violations and stores the results in a database.

---

## Table of Contents
1. [Setup Instructions](#setup-instructions)
2. [API Documentation](#api-documentation)
3. [System Architecture Overview](#system-architecture-overview)
4. [Prompt Engineering Approach](#prompt-engineering-approach)

---

## Setup Instructions

### Prerequisites
1. Install Python 3.10+ and Node.js (v16+).
2. Install Git for version control.
3. Sign up for an [OpenAI API Key](https://platform.openai.com/account/api-keys).
4. Ensure you have a database setup (SQLite is used in this project).

### Backend Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/Hahamob/Road_Site_Safety_Compliance_System.git
   cd Road_Site_Safety_Compliance_System/backend
Create a virtual environment and activate it:

bash
Copy
Edit
python -m venv venv
source venv/bin/activate    # On Windows: venv\Scripts\activate
Install dependencies:

bash
Copy
Edit
pip install -r requirements.txt
Set up the .env file for environment variables:

plaintext
Copy
Edit
OPENAI_API_KEY=<your_openai_api_key>
DATABASE_URL=sqlite:///safety_compliance.db
Initialize the database:

bash
Copy
Edit
python -c "from database import initialize_db; initialize_db()"
Run the backend server:

bash
Copy
Edit
uvicorn app:app --reload
Frontend Setup
Navigate to the frontend folder:

bash
Copy
Edit
cd ../frontend
Install dependencies:

bash
Copy
Edit
npm install
Start the frontend development server:

bash
Copy
Edit
npm start
Access the system at http://localhost:3000.

#API Documentation
Backend Endpoints
1. POST /analyze/
Description: Analyzes an uploaded image for safety compliance.
Request:
Content-Type: multipart/form-data
Parameters:
image: The uploaded image file.
Response:
json
Copy
Edit
{
  "timestamp": "2023-01-01T10:00:00Z",
  "location_id": "default",
  "image_reference": "filename.jpg",
  "violation_type": ["No hardhat", "No hi-vis vest"],
  "risk_level": "High Risk",
  "worker_count": 3
}
2. GET /results/
Description: Fetches all analysis results stored in the database.
Response:
json
Copy
Edit
[
  {
    "timestamp": "2023-01-01T10:00:00Z",
    "location_id": "default",
    "image_reference": "filename.jpg",
    "violation_type": ["No hardhat", "No hi-vis vest"],
    "risk_level": "High Risk",
    "worker_count": 3
  }
]
System Architecture Overview
The system follows a client-server architecture and is structured as follows:

Frontend:

Built with React.js.
Features:
Image upload interface.
Dashboard for displaying analysis results and compliance statistics.
Violation trends and filtering options.
Backend:

Built with FastAPI (Python).
Integrates with the OpenAI Vision API for image analysis.
Stores analysis results in a SQLite database.
Database:

SQLite is used for lightweight storage.
Table: safety_compliance_results
timestamp: Datetime of analysis.
location_id: Identifier for image location.
image_reference: Filename of the uploaded image.
violation_type: List of detected violations.
risk_level: Categorized risk level.
worker_count: Number of workers detected.
Integration with OpenAI:

The Vision API processes images and generates compliance-related insights.
Prompt Engineering Approach
The system uses carefully crafted prompts to maximize the accuracy of OpenAI's Vision API. The prompts focus on extracting structured data, including:

Worker Count: Prompt ensures accurate detection of the number of individuals in the image.
PPE Compliance:
Checks for the presence/absence of hardhats.
Identifies high-visibility vests.
Violation and Risk Level:
Maps detected violations to predefined risk categories: "High Risk," "Medium Risk," and "Compliant."
Example Prompt:
plaintext
Copy
Edit
Analyze this image and provide the following details:
1. Count the number of workers.
2. Identify the presence or absence of hardhats.
3. Identify the presence or absence of hi-vis vests.
4. Provide the risk level based on:
   - High Risk: No hardhat AND no hi-vis vest.
   - Medium Risk: Either hardhat or hi-vis vest missing.
   - Compliant: Both present.
Provide the output in this JSON format:
{
  "worker_count": 3,
  "hardhats": "present",
  "hi_vis_vests": "present",
  "risk_level": "Compliant"
}
Improvements:
By structuring the output, we ensure compatibility with frontend and backend workflows.
Additional prompts handle ambiguous scenarios or unexpected input formats.
Future Enhancements
Enhanced Image Preprocessing:

Use AI models to pre-detect objects before OpenAI Vision API processing.
Scalability:

Migrate to a cloud-based database for multi-user support.
Implement a microservices architecture for separate frontend, backend, and API services.
Mobile Integration:

Develop a mobile application for on-site safety assessments.
