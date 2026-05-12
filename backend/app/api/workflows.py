# backend/app/api/workflows.py
from fastapi import APIRouter, Depends, WebSocket
from ..dependencies.auth import require_role

router = APIRouter()

@router.get("/")
def list_workflows(user = Depends(require_role(["admin", "analyst", "viewer"]))):
    return [{"id": 1, "name": "Standard Customer Support Flow"}]

@router.post("/run/{workflow_id}")
def run_workflow(workflow_id: int, user = Depends(require_role(["admin", "analyst"]))):
    return {"status": "started", "run_id": "demo-run-123"}
