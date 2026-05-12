# backend/app/models/redteam_test.py

from sqlalchemy import Column, Integer, String, JSON, DateTime, Boolean, ForeignKey
from sqlalchemy.sql import func
from ..database import Base

class RedTeamTest(Base):
    __tablename__ = "redteam_tests"

    id = Column(Integer, primary_key=True, index=True)
    workflow_id = Column(Integer, ForeignKey("workflows.id"), nullable=True)
    agent_id = Column(Integer, ForeignKey("agents.id"), nullable=True)
    template_name = Column(String, nullable=False)
    attacker_user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    success = Column(Boolean, default=False)
    report = Column(JSON, nullable=True)  # detailed results
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    completed_at = Column(DateTime(timezone=True), nullable=True)
