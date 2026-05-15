from fastapi import APIRouter, Depends, UploadFile, File
from sqlalchemy.orm import Session
from ..database import get_db
from ..models.policy import Policy
from ..dependencies.auth import require_role
import io
import PyPDF2

router = APIRouter()

@router.get("/")
def list_policies(
    db: Session = Depends(get_db),
    user = Depends(require_role(["admin", "analyst", "viewer"]))
):
    return db.query(Policy).all()

@router.post("/")
def create_policy(data: dict, user = Depends(require_role(["admin"]))):
    return {"status": "created", "data": data}

@router.post("/generate-from-doc")
async def generate_policy_from_doc(
    file: UploadFile = File(...),
    user = Depends(require_role(["admin"]))
):
    # Read PDF content
    content = ""
    if file.filename.endswith(".pdf"):
        pdf_reader = PyPDF2.PdfReader(io.BytesIO(await file.read()))
        for page in pdf_reader.pages:
            content += page.extract_text()
    else:
        content = (await file.read()).decode()

    # Simulate AI Policy Generation
    # In a real app, you would send 'content' to an LLM here.
    return {
        "filename": file.filename,
        "confidence": 0.92,
        "generated_policy": {
            "name": f"Auto-Generated: {file.filename[:20]}",
            "rules": [
                {"type": "PII", "action": "Redact", "description": "Auto-detected PII requirements from document."},
                {"type": "Toxicity", "action": "Block", "description": "Ensures adherence to corporate safety guidelines."},
                {"type": "Custom", "action": "Log", "description": "Specific compliance checks found in section 4.2"}
            ],
            "version": "1.0-alpha"
        }
    }
