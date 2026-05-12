# backend/app/services/guardrail.py

import re
from typing import List, Dict, Any
from sqlalchemy.orm import Session
from ..models.policy import Policy
from ..models.guardrail_violation import GuardrailViolation, SeverityLevel

# Simple regex patterns for PII detection (demo purposes)
PII_REGEXES = {
    "credit_card": r"\\b(?:\\d[ -]*?){13,16}\\b",
    "email": r"[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-.]+",
    "phone": r"\\b\\d{10,15}\\b",
}

def _match_patterns(text: str, patterns: List[str]) -> List[str]:
    matches = []
    for pat in patterns:
        if re.search(pat, text, flags=re.IGNORECASE):
            matches.append(pat)
    return matches

def evaluate_input(text: str, db: Session, policy_ids: List[int]) -> List[Dict[str, Any]]:
    """Run input guardrails for the supplied text against given policies.
    Returns a list of violation dictionaries.
    """
    violations = []
    # Load policies
    policies = db.query(Policy).filter(Policy.id.in_(policy_ids), Policy.is_active == True).all()
    for policy in policies:
        # Assume policy.rules is a dict like {"type": "regex", "patterns": ["email", "credit_card"], "severity": "high"}
        rules = policy.rules or {}
        rule_type = rules.get("type")
        if rule_type == "regex":
            pattern_keys = rules.get("patterns", [])
            regexes = [PII_REGEXES.get(k) for k in pattern_keys if k in PII_REGEXES]
            regexes = [r for r in regexes if r]
            matched = _match_patterns(text, regexes)
            if matched:
                violations.append({
                    "policy_id": policy.id,
                    "rule_name": "regex_input",
                    "severity": rules.get("severity", "medium"),
                    "matched_patterns": matched,
                })
        # Additional rule types (e.g., jailbreak) can be added later
    return violations

def evaluate_output(text: str, db: Session, policy_ids: List[int]) -> List[Dict[str, Any]]:
    """Run output guardrails (toxicity, harmful content) – simple placeholder implementation.
    """
    violations = []
    policies = db.query(Policy).filter(Policy.id.in_(policy_ids), Policy.is_active == True).all()
    for policy in policies:
        rules = policy.rules or {}
        rule_type = rules.get("type")
        if rule_type == "toxicity":
            # Very naive toxicity check – look for a black‑list of words
            toxic_words = rules.get("blacklist", [])
            found = [w for w in toxic_words if re.search(rf"\\b{re.escape(w)}\\b", text, flags=re.IGNORECASE)]
            if found:
                violations.append({
                    "policy_id": policy.id,
                    "rule_name": "toxicity_output",
                    "severity": rules.get("severity", "high"),
                    "matched_words": found,
                })
    return violations

def record_violations(violations: List[Dict[str, Any]], execution_log_id: int, db: Session):
    """Persist GuardrailViolation rows linked to an execution log.
    """
    for v in violations:
        gv = GuardrailViolation(
            execution_log_id=execution_log_id,
            severity=SeverityLevel(v.get("severity", "medium").upper()),
            rule_name=v.get("rule_name", "unknown"),
            message=str(v),
        )
        db.add(gv)
    db.commit()
