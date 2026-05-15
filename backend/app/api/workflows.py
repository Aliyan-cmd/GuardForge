from fastapi import APIRouter, Depends, WebSocket
from sqlalchemy.orm import Session
from ..database import get_db
from ..models.workflow import Workflow
from ..dependencies.auth import require_role

import asyncio
import random

router = APIRouter()

@router.get("/")
def list_workflows(
    db: Session = Depends(get_db),
    user = Depends(require_role(["admin", "analyst", "viewer"]))
):
    return db.query(Workflow).all()

@router.post("/run/{workflow_id}")
def run_workflow(
    workflow_id: int, 
    db: Session = Depends(get_db),
    user = Depends(require_role(["admin", "analyst"]))
):
    workflow = db.query(Workflow).get(workflow_id)
    if not workflow:
        return {"status": "error", "message": "Workflow not found"}
    return {"status": "started", "run_id": f"demo-run-{random.randint(1000, 9999)}", "workflow": workflow.name}

@router.websocket("/ws/run/{run_id}")
async def websocket_endpoint(websocket: WebSocket, run_id: str):
    # In a real app, you would verify the token here, e.g., via a query param.
    # For the demo, we accept all connections to avoid 403 Forbidden issues.
    await websocket.accept()
    try:
        # Simulate a sequence of trace steps
        steps = [
            {"step": 1, "agent_id": "Router", "input": "I need help with my billing address", "output": "Routing to Billing Agent", "faithfulness": 98.2, "guardrail_passed": True},
            {"step": 2, "agent_id": "Billing", "input": "Routing to Billing Agent", "output": "Retrieving customer record #4521", "faithfulness": 95.0, "guardrail_passed": True},
            {"step": 3, "agent_id": "Security-Filter", "input": "Retrieving customer record #4521", "output": "Warning: PII Detected in log. Redacting...", "faithfulness": 100.0, "guardrail_passed": False},
            {"step": 4, "agent_id": "Billing", "input": "Redacted log confirmed", "output": "Updated address for account ending in *4221", "faithfulness": 92.5, "guardrail_passed": True},
        ]
        
        for step in steps:
            await asyncio.sleep(1.5) # Simulate processing time
            await websocket.send_json({"type": "trace_step", **step})
            
        await asyncio.sleep(1)
        await websocket.send_json({"type": "status", "message": "Workflow completed successfully"})
    except Exception as e:
        print(f"WS Error: {e}")
    finally:
        await websocket.close()
