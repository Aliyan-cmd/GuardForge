# backend/app/models/audit.py

from sqlalchemy import Column, Integer, String, DateTime, JSON
from sqlalchemy.sql import func
from ..database import Base

class AuditLog(Base):
    __tablename__ = "audit_logs"

    id = Column(Integer, primary_key=True, index=True)
    agent_id = Column(String, nullable=True)
    action = Column(String, nullable=False)
    details = Column(String, nullable=True)
    severity = Column(String, default="info") # info | warning | critical
    timestamp = Column(DateTime(timezone=True), server_default=func.now())
    metadata_json = Column(JSON, nullable=True)
