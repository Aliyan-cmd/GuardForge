from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .core.config import Settings
from .database import Base, engine
from . import models
from .api import router as api_router

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

# Include main router
app.include_router(api_router)

# Create DB tables if they don't exist (for MVP)
@app.on_event("startup")
async def startup():
    # This will generate tables based on models; in production use Alembic migrations.
    Base.metadata.create_all(bind=engine)
