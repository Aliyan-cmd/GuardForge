from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .core.config import Settings
from .database import Base, engine
from . import models
from .api import router as api_router

app = FastAPI(title="GuardForge Backend", version="0.1.0")

# CORS (allow frontend origin)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # Allow all origins for compatibility across ports (e.g. 5174)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include main router
app.include_router(api_router)

# Create DB tables if they don't exist (for MVP)
@app.on_event("startup")
async def startup():
    # This will generate tables based on models; in production use Alembic migrations.
    Base.metadata.create_all(bind=engine)
