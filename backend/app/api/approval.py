# backend/app/api/approval.py
from fastapi import APIRouter, Depends
from ..dependencies.auth import require_role

router = APIRouter()

@router.get("/pending")
def get_pending_approvals(user = Depends(require_role(["admin", "analyst"]))):
    return [{"id": 1, "severity": "high", "reason": "PII detected in output", "created_at": "2024-03-20T11:00:00"}]

@router.post("/{approval_id}")
def resolve_approval(approval_id: int, action: str, user = Depends(require_role(["admin"]))):
    return {"status": "resolved", "action": action}
