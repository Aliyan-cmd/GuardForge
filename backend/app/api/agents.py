# backend/app/api/agents.py

from fastapi import APIRouter, Depends
from ..dependencies.auth import require_role

router = APIRouter()

@router.get("/", tags=["agents"])
def list_agents(user = Depends(require_role(["admin", "analyst", "viewer"]))):
    # Placeholder list of agents
    return [
        {"id": 1, "name": "Agent Alpha", "status": "active"},
        {"id": 2, "name": "Agent Beta", "status": "idle"},
    ]
