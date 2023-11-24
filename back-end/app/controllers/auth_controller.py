from jose import JWTError, jwt
from datetime import datetime, timedelta
from fastapi import HTTPException, status, Depends
from fastapi.security import OAuth2PasswordBearer
from typing import Annotated
from sqlalchemy.orm import Session
from passlib.context import CryptContext
from ..settings.config import settings
from ..connectDB import database
from ..schemas import token_schemas, user_schemas
from ..connectDB.database import get_db
from ..models import user_model

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


SECRET_KEY = settings.secret_key
ALGORITHM = settings.algorithm
ACCESS_TOKEN_EXPIRE_MINUTES = settings.access_token_expire_minutes


def hash(password: str):
    return pwd_context.hash(password)


def verify(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)


def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


def is_token_expired(token: str):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        exp = payload.get("exp")
        if (datetime.fromtimestamp(exp) < datetime.now()):
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                                detail=f"Could not validate credentials", headers={"WWW-Authenticate": "Bearer"})
        return True
    except JWTError:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                            detail=f"Could not validate credentials", headers={"WWW-Authenticate": "Bearer"})


def get_current_user(token: str, db: Session):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        id: str = payload.get("user_id")
        if id is None:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                                detail="Could not find user info", headers={"WWW-Authenticate": "Bearer"})
        token_data = token_schemas.TokenData(user_id=str(id))
    except JWTError:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                            detail="Could not find user info", headers={"WWW-Authenticate": "Bearer"})
    user = db.query(user_model.User).filter(
        user_model.User.id == token_data.user_id).first()
    return user_schemas.UserInfo(email=user.email)
