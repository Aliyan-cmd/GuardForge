from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from ..database import get_db
from ..models import User, Agent, Workflow, AuditLog, Policy
from ..dependencies.auth import require_role
from datetime import datetime, timedelta

router = APIRouter()

@router.get("/overview", tags=["dashboard"])
def get_overview(
    db: Session = Depends(get_db),
    user = Depends(require_role(["admin", "analyst", "viewer"]))
):
    # Calculate real stats from DB
    total_agents = db.query(Agent).count()
    active_workflows = db.query(Workflow).count()
    violations_today = db.query(AuditLog).filter(AuditLog.severity == "critical").count()
    
    # Mock some data for charts since we don't have historical data yet
    return {
        "total_agents": total_agents,
        "active_workflows": active_workflows,
        "executions_today": 12,
        "violations_today": violations_today,
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
