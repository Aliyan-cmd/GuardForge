# backend/app/api/dashboard.py

from fastapi import APIRouter, Depends
from ..dependencies.auth import require_role
from datetime import datetime, timedelta

router = APIRouter()

@router.get("/overview", tags=["dashboard"])
def get_overview(user = Depends(require_role(["admin", "analyst", "viewer"]))):
    # Mock data for analytics charts
    return {
        "total_agents": 5,
        "active_workflows": 2,
        "executions_today": 12,
        "violations_today": 1,
        "pending_approvals": 0,
        "redteam_tests": 3,
        "risk_score": 24, # Out of 100
        "execution_trends": [
            {"date": (datetime.now() - timedelta(days=i)).strftime("%m-%d"), "executions": 10 + i, "violations": i % 2}
            for i in range(7, 0, -1)
        ],
        "policy_violations": [
            {"name": "PII Leakage", "count": 15},
            {"name": "Prompt Injection", "count": 8},
            {"name": "Toxic Language", "count": 3},
            {"name": "Unauthorized Tool Use", "count": 1},
        ],
        "risk_distribution": [
            {"category": "Hallucination", "value": 30},
            {"category": "Safety", "value": 45},
            {"category": "Security", "value": 15},
            {"category": "Compliance", "value": 10},
        ]
    }

@router.post("/seed-demo", tags=["dashboard"])
def seed_demo_data(user = Depends(require_role(["admin"]))):
    # In a real app, you would populate the database here.
    return {"status": "success", "message": "Demo environment initialized with enterprise data."}
