# backend/app/api/redteam.py
from fastapi import APIRouter, Depends
from ..dependencies.auth import require_role

router = APIRouter()

@router.get("/templates")
def get_attack_templates(user = Depends(require_role(["admin", "analyst"]))):
    return [{"id": "injection_01", "name": "Prompt Injection Basic"}]

@router.post("/run")
def run_redteam_test(data: dict, user = Depends(require_role(["admin"]))):
    return {"status": "success", "results": {"vulnerabilities_found": 0}}
