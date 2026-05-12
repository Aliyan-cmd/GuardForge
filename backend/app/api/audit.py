# backend/app/api/audit.py

from fastapi import APIRouter, Depends, Query
from ..dependencies.auth import require_role
from datetime import datetime, timedelta

router = APIRouter()

@router.get("/search", tags=["audit"])
def search_audit_logs(
    q: str = Query(..., description="Natural language query"),
    user = Depends(require_role(["admin", "analyst"]))
):
    # Mock NL processing logic
    q_lower = q.lower()
    
    # Simulating results based on keywords
    results = [
        {"id": 101, "timestamp": "2024-05-12 14:20:01", "agent": "Alpha", "event": "Prompt Injection Attempt", "risk": "High", "action": "Blocked"},
        {"id": 102, "timestamp": "2024-05-12 14:25:32", "agent": "Beta", "event": "PII Detection", "risk": "Medium", "action": "Redacted"},
        {"id": 103, "timestamp": "2024-05-12 15:10:11", "agent": "Alpha", "event": "Execution Success", "risk": "Low", "action": "Logged"},
    ]
    
    if "high" in q_lower or "injection" in q_lower:
        return {"query": q, "count": 1, "results": [results[0]]}
    
    return {"query": q, "count": len(results), "results": results}

@router.get("/logs", tags=["audit"])
def get_logs(user = Depends(require_role(["admin", "analyst"]))):
    return [
        {"id": 101, "timestamp": "2024-05-12 14:20:01", "agent": "Alpha", "event": "Prompt Injection Attempt", "risk": "High", "action": "Blocked"},
        {"id": 102, "timestamp": "2024-05-12 14:25:32", "agent": "Beta", "event": "PII Detection", "risk": "Medium", "action": "Redacted"},
        {"id": 103, "timestamp": "2024-05-12 15:10:11", "agent": "Alpha", "event": "Execution Success", "risk": "Low", "action": "Logged"},
    ]
