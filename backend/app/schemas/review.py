# backend/app/schemas/review.py

from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class ReviewBase(BaseModel):
    user_name: str
    user_role: Optional[str] = None
    content: str
    rating: float = 5.0

class ReviewCreate(ReviewBase):
    pass

class Review(ReviewBase):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True
