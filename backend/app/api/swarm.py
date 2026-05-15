# backend/app/api/swarm.py
from fastapi import APIRouter, Depends, BackgroundTasks
from ..dependencies.auth import require_role
from ..core.swarm import swarm_app
from ..database import SessionLocal
from ..models.audit import AuditLog
from datetime import datetime
import uuid

router = APIRouter()

# Global state for demo tracking
swarm_runs = {}

def run_swarm_task(run_id: str, task: str):
    db = SessionLocal()
    initial_state = {
        "task": task,
        "steps": [],
        "results": {},
        "current_agent": "Researcher",
        "status": "running"
    }
    
    swarm_runs[run_id] = initial_state
    
    # Run the graph
    # In a real app, we would loop through steps and log each one to GuardForge
    for output in swarm_app.stream(initial_state):
        agent_name = list(output.keys())[0]
        agent_data = output[agent_name]
        
        # GuardForge Interception & Logging
        log = AuditLog(
            agent_id=agent_name,
            action="swarm_handoff",
            details=f"Agent {agent_name} processed task. Result: {str(agent_data['results'].get(agent_name.lower().split()[0], '...'))}",
            severity="info",
            timestamp=datetime.utcnow()
        )
        db.add(log)
        db.commit()
        
        # Update local state for frontend polling
        swarm_runs[run_id].update(agent_data)
        
    swarm_runs[run_id]["status"] = "completed"
    db.close()

@router.post("/run")
def start_swarm(payload: dict, background_tasks: BackgroundTasks, user = Depends(require_role(["admin", "analyst"]))):
    run_id = str(uuid.uuid4())
    task = payload.get("task", "Analyze contract")
    background_tasks.add_task(run_swarm_task, run_id, task)
    return {"run_id": run_id, "status": "started"}

@router.get("/status/{run_id}")
def get_swarm_status(run_id: str, user = Depends(require_role(["admin", "analyst", "viewer"]))):
    return swarm_runs.get(run_id, {"status": "not_found"})
