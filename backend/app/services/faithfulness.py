# backend/app/services/faithfulness.py

import re
from typing import Tuple
from sqlalchemy.orm import Session
from ..models.execution_log import ExecutionLog

def _citation_check(output: str) -> bool:
    """Very naive check: looks for patterns like [source] or (source)."""
    return bool(re.search(r"\[.*?\]|\(.*?\)", output))

def _self_consistency_check(input_text: str, output_text: str) -> float:
    """Placeholder self‑consistency: compare length ratio as a crude proxy.
    Returns a score 0‑100 where closer to 1.0 is more consistent.
    """
    if not input_text:
        return 0.0
    ratio = len(output_text) / len(input_text)
    # clamp between 0.2 and 1.5 then map to 0‑100
    ratio = max(0.2, min(1.5, ratio))
    return (1 - abs(1 - ratio)) * 100

def compute_faithfulness_score(input_text: str, output_text: str) -> float:
    """Combine citation presence and self‑consistency into a single score.
    Simple weighted average: 60% citation, 40% consistency.
    """
    citation = 100 if _citation_check(output_text) else 0
    consistency = _self_consistency_check(input_text, output_text)
    return 0.6 * citation + 0.4 * consistency

def store_faithfulness_score(execution_log_id: int, score: float, db: Session):
    """Persist the score into the ExecutionLog row.
    """
    db.query(ExecutionLog).filter(ExecutionLog.id == execution_log_id).update({"faithfulness_score": score})
    db.commit()
