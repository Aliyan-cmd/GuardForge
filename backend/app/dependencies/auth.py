# backend/app/dependencies/auth.py

from fastapi import Depends, HTTPException, status
from jose import JWTError
from sqlalchemy.orm import Session

from ..core.security import decode_access_token
from ..core.config import settings
from ..database import get_db
from ..models.user import User

from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials

security = HTTPBearer()

def get_current_user(
    auth: HTTPAuthorizationCredentials = Depends(security), 
    db: Session = Depends(get_db)
):
    # FastAPI will provide the token via Header Authorization: Bearer <token>
    token = auth.credentials
    if not token:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Missing token")
    token_data = decode_access_token(token)
    if not token_data or not token_data.email:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token")
    user = db.query(User).filter(User.email == token_data.email).first()
    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="User not found")
    return user

def require_role(allowed_roles: list[str]):
    def role_checker(user: User = Depends(get_current_user)):
        if user.role not in allowed_roles:
            raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Insufficient permissions")
        return user
    return role_checker
