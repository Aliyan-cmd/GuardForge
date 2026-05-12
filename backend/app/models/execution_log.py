# backend/app/models/execution_log.py

from sqlalchemy import Column, Integer, String, JSON, DateTime, Float, Boolean, ForeignKey
from sqlalchemy.sql import func
from ..database import Base

class ExecutionLog(Base):
    __tablename__ = "execution_logs"

    id = Column(Integer, primary_key=True, index=True)
    workflow_id = Column(Integer, ForeignKey("workflows.id"), nullable=False)
    agent_id = Column(Integer, ForeignKey("agents.id"), nullable=False)
    step_number = Column(Integer, nullable=False)
    input_text = Column(String, nullable=True)
    output_text = Column(String, nullable=True)
    # Hallucination / faithfulness score (0-100)
    faithfulness_score = Column(Float, nullable=True)
    # Timestamp of execution step
    timestamp = Column(DateTime(timezone=True), server_default=func.now())
    # Whether this step passed guardrails
    guardrail_passed = Column(Boolean, default=True)
    # JSON field with detailed guardrail results (severity, messages)
    guardrail_results = Column(JSON, nullable=True)
