from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from ..database import get_db
from ..models.audit import AuditLog
from ..dependencies.auth import require_role
from datetime import datetime, timedelta

router = APIRouter()

@router.get("/search", tags=["audit"])
def search_audit_logs(
    q: str = Query(..., description="Natural language query"),
    db: Session = Depends(get_db),
    user = Depends(require_role(["admin", "analyst", "viewer"]))
):
    q_lower = q.lower()
    # Simple keyword search in details or agent_id
    logs = db.query(AuditLog).filter(
        (AuditLog.details.ilike(f"%{q_lower}%")) | 
        (AuditLog.agent_id.ilike(f"%{q_lower}%")) |
        (AuditLog.action.ilike(f"%{q_lower}%"))
    ).all()
    
    return {
        "query": q, 
        "count": len(logs), 
        "results": [
            {
                "id": log.id, 
                "timestamp": log.timestamp.strftime("%Y-%m-%d %H:%M:%S"), 
                "agent": log.agent_id, 
                "event": log.action, 
                "risk": log.severity.capitalize(), 
                "action": log.details
            } for log in logs
        ]
    }

@router.get("/logs", tags=["audit"])
def get_logs(
    db: Session = Depends(get_db),
    user = Depends(require_role(["admin", "analyst", "viewer"]))
):
    logs = db.query(AuditLog).order_by(AuditLog.timestamp.desc()).limit(50).all()
    return [
        {
            "id": log.id, 
            "timestamp": log.timestamp.strftime("%Y-%m-%d %H:%M:%S"), 
            "agent": log.agent_id, 
            "event": log.action, 
            "risk": log.severity.capitalize(), 
            "action": log.details
        } for log in logs
    ]
