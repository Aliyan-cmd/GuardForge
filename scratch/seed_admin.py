
from backend.app.database import SessionLocal, engine, Base
from backend.app.models.user import User
from backend.app.models.agent import Agent
from backend.app.models.workflow import Workflow
from backend.app.models.policy import Policy
from backend.app.models.audit import AuditLog
from backend.app.core.security import hash_password
from datetime import datetime, timedelta

def seed_database():
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()
    
    # 1. Seed Admin User
    admin = db.query(User).filter(User.email == "admin@guardforge.ai").first()
    if not admin:
        admin = User(
            email="admin@guardforge.ai",
            hashed_password=hash_password("admin123"),
            full_name="Aliyan Admin",
            role="admin"
        )
        db.add(admin)
        db.commit()
        print("Admin user created: admin@guardforge.ai / admin123")
    
    # 2. Seed Agents
    if db.query(Agent).count() == 0:
        agents = [
            Agent(name="Customer Router", description="Routes queries to specific agents", status="active"),
            Agent(name="Billing Specialist", description="Handles invoice and payment queries", status="active"),
            Agent(name="Security Filter", description="Scans for injection and malicious intent", status="active"),
            Agent(name="PII Scrubber", description="Redacts sensitive data", status="inactive"),
        ]
        db.add_all(agents)
        print("Sample agents created.")

    # 3. Seed Policies
    if db.query(Policy).count() == 0:
        policies = [
            Policy(name="Standard Safety", description="Basic PII and Toxicity filters", rules={"pii": True, "toxicity": True}),
            Policy(name="Financial Compliance", description="Strict checks for banking data", rules={"pii": True, "credit_card": True, "account_number": True}),
        ]
        db.add_all(policies)
        print("Sample policies created.")

    # 4. Seed Workflows
    if db.query(Workflow).count() == 0:
        workflows = [
            Workflow(name="Support Pipeline", description="Route and resolve customer queries", steps=["1", "2"]),
            Workflow(name="Internal Audit", description="Automated document compliance check", steps=["3"]),
        ]
        db.add_all(workflows)
        print("Sample workflows created.")

    # 5. Seed Audit Logs
    if db.query(AuditLog).count() == 0:
        logs = [
            AuditLog(agent_id="Security Filter", action="PII Detected", severity="critical", details="Redacted email from user input"),
            AuditLog(agent_id="Customer Router", action="Agent Execution", severity="info", details="Successfully routed to Billing"),
            AuditLog(agent_id="PII Scrubber", action="Service Latency", severity="warning", details="Latency exceeded threshold: 250ms"),
        ]
        db.add_all(logs)
        print("Sample audit logs created.")

    db.commit()
    db.close()

if __name__ == "__main__":
    seed_database()
