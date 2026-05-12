from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .core.config import Settings
from .database import Base, engine
from .api import auth, agents, policies, workflows, audit, approval, redteam, dashboard, reports

app = FastAPI(title="GuardForge Backend", version="0.1.0")

# CORS (allow frontend origin)
origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "http://localhost:3000",
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(auth.router, prefix="/auth", tags=["auth"])
app.include_router(agents.router, prefix="/agents", tags=["agents"])
app.include_router(policies.router, prefix="/policies", tags=["policies"])
app.include_router(workflows.router, prefix="/workflows", tags=["workflows"])
app.include_router(audit.router, prefix="/audit", tags=["audit"])
app.include_router(approval.router, prefix="/approvals", tags=["approvals"])
app.include_router(redteam.router, prefix="/redteam", tags=["redteam"])
app.include_router(dashboard.router, prefix="/dashboard", tags=["dashboard"])
app.include_router(reports.router, prefix="/reports", tags=["reports"])

# Create DB tables if they don't exist (for MVP)
@app.on_event("startup")
async def startup():
    # This will generate tables based on models; in production use Alembic migrations.
    Base.metadata.create_all(bind=engine)
