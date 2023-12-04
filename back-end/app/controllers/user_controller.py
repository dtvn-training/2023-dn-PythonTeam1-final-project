from fastapi import Depends, HTTPException, status
from sqlalchemy.orm import Session

from ..models import user_model
from ..schemas import user_schemas
from ..connectDB.database import get_db
from ..controllers import auth_controller as auth


def get_users(db: Session = Depends(get_db)):
    users = db.query(user_model.User).all()
    return users


def create_a_user(user: user_schemas.UserCreate, db: Session = Depends(get_db)):

    existing_user = db.query(user_model.User).filter(
        user_model.User.email == user.email).first()

    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email is already in use. Please choose another email address."
        )

    if user.password != user.confirm_password:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Password and confirm password do not match."
        )

    # hash pwd
    hashed_password = auth.hash(user.password)
    user.password = hashed_password
    user_dict = user.dict(exclude={"confirm_password"})
    new_user = user_model.User(**user_dict)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user


def update_user(user_info: user_schemas.UserUpdate, db: Session = Depends(get_db)):
    db_user = get_user_by_email(db, user_info.email)

    if db_user is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Can not find user")

    if user_info.password != user_info.confirm_password:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Password and confirm password do not match."
        )

    user_dict = user_info.dict(exclude={"confirm_password"})
    for field, value in user_dict.items():
        setattr(db_user, field, value)

    db.commit()
    db.refresh(db_user)

    return db_user


def get_user_by_email(db: Session, email: str):
    return db.query(user_model.User).filter(user_model.User.email == email).first()
