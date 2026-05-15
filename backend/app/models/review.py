# backend/app/models/review.py

from sqlalchemy import Column, Integer, String, DateTime, Float
from sqlalchemy.sql import func
from ..database import Base

class Review(Base):
    __tablename__ = "reviews"

    id = Column(Integer, primary_key=True, index=True)
    user_name = Column(String, nullable=False)
    user_role = Column(String, nullable=True)
    content = Column(String, nullable=False)
    rating = Column(Float, default=5.0)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
