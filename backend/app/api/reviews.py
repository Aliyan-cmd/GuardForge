# backend/app/api/reviews.py

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from ..database import get_db
from ..models.review import Review
from ..schemas.review import ReviewCreate, Review as ReviewSchema

router = APIRouter()

@router.get("/", response_model=List[ReviewSchema])
def get_reviews(db: Session = Depends(get_db)):
    """Fetch all user reviews, newest first."""
    return db.query(Review).order_by(Review.created_at.desc()).all()

@router.post("/", response_model=ReviewSchema)
def create_review(review: ReviewCreate, db: Session = Depends(get_db)):
    """Submit a new review."""
    db_review = Review(
        user_name=review.user_name,
        user_role=review.user_role,
        content=review.content,
        rating=review.rating
    )
    db.add(db_review)
    db.commit()
    db.refresh(db_review)
    return db_review
