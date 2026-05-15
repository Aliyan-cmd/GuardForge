from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from ..database import get_db
from ..models.agent import Agent
from ..dependencies.auth import require_role

router = APIRouter()

@router.get("/", tags=["agents"])
def list_agents(
    db: Session = Depends(get_db),
    user = Depends(require_role(["admin", "analyst", "viewer"]))
):
    return db.query(Agent).all()
