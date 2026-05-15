# backend/app/models/guardrail_violation.py

from sqlalchemy import Column, Integer, String, JSON, DateTime, ForeignKey, Enum
from sqlalchemy.sql import func
from ..database import Base
import enum

class SeverityLevel(str, enum.Enum):
    LOW = "low"
    MEDIUM = "medium"
    HIGH = "high"
    CRITICAL = "critical"

class GuardrailViolation(Base):
    __tablename__ = "guardrail_violations"

    id = Column(Integer, primary_key=True, index=True)
    execution_log_id = Column(Integer, ForeignKey("execution_logs.id"), nullable=False)
    severity = Column(Enum(SeverityLevel), nullable=False)
    rule_name = Column(String, nullable=False)
    message = Column(String, nullable=False)
    timestamp = Column(DateTime(timezone=True), server_default=func.now())
    violation_metadata = Column(JSON, nullable=True)  # additional details
