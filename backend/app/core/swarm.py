# backend/app/core/swarm.py
import time
import uuid
from typing import Annotated, TypedDict, List
from langgraph.graph import StateGraph, END

# State definition
class SwarmState(TypedDict):
    task: str
    steps: List[str]
    results: dict
    current_agent: str
    status: str

def researcher_node(state: SwarmState):
    print(f"Researcher working on: {state['task']}")
    time.sleep(1) # Simulating work
    state["steps"].append("Researcher")
    state["results"]["research"] = "Found 3 relevant contract clauses regarding data liability."
    state["current_agent"] = "Analyzer"
    return state

def analyzer_node(state: SwarmState):
    print("Analyzer evaluating research...")
    time.sleep(1)
    state["steps"].append("Analyzer")
    state["results"]["analysis"] = "Liability clauses are standard but missing arbitration specifics."
    state["current_agent"] = "Compliance Checker"
    return state

def compliance_node(state: SwarmState):
    print("Compliance Checker validating against GDPR...")
    time.sleep(1)
    state["steps"].append("Compliance Checker")
    state["results"]["compliance"] = "Clause 4.2 violates GDPR data residency requirements."
    state["current_agent"] = "Reporter"
    return state

def reporter_node(state: SwarmState):
    print("Reporter generating final brief...")
    time.sleep(1)
    state["steps"].append("Reporter")
    state["results"]["report"] = "Final Brief: Contract requires revision on Section 4.2 to ensure GDPR compliance."
    state["status"] = "completed"
    return state

# Supervisor / Router (Simple sequential for Phase 1)
def supervisor_router(state: SwarmState):
    if state["status"] == "completed":
        return END
    return state["current_agent"]

def create_swarm_graph():
    workflow = StateGraph(SwarmState)
    
    workflow.add_node("Researcher", researcher_node)
    workflow.add_node("Analyzer", analyzer_node)
    workflow.add_node("Compliance Checker", compliance_node)
    workflow.add_node("Reporter", reporter_node)
    
    workflow.set_entry_point("Researcher")
    
    workflow.add_edge("Researcher", "Analyzer")
    workflow.add_edge("Analyzer", "Compliance Checker")
    workflow.add_edge("Compliance Checker", "Reporter")
    workflow.add_edge("Reporter", END)
    
    return workflow.compile()

swarm_app = create_swarm_graph()
