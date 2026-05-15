# backend/app/api/__init__.py
"""Aggregate all API routers for FastAPI app."""
from fastapi import APIRouter

from . import auth, agents, policies, workflows, audit, approval, redteam, dashboard, reports, swarm

router = APIRouter()
router.include_router(auth.router, prefix="/auth", tags=["auth"])
router.include_router(agents.router, prefix="/agents", tags=["agents"])
router.include_router(policies.router, prefix="/policies", tags=["policies"])
router.include_router(workflows.router, prefix="/workflows", tags=["workflows"])
router.include_router(audit.router, prefix="/audit", tags=["audit"])
router.include_router(approval.router, prefix="/approvals", tags=["approvals"])
router.include_router(redteam.router, prefix="/redteam", tags=["redteam"])
router.include_router(dashboard.router, prefix="/dashboard", tags=["dashboard"])
router.include_router(reports.router, prefix="/reports", tags=["reports"])
router.include_router(swarm.router, prefix="/swarm", tags=["swarm"])
