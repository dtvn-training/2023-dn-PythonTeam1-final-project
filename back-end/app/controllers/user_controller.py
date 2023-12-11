from fastapi import Depends, HTTPException, status
from sqlalchemy.orm import Session
from sqlalchemy import or_
from ..models import user_model
from ..schemas import user_schemas
from ..connectDB.database import get_db
from ..controllers import auth_controller as auth
from fastapi import UploadFile
import os


def get_users(token: str, db: Session = Depends(get_db)):
    user = auth.get_current_user(token, db)
    if user.role_id != '1':
        raise HTTPException(
            status_code=status.HTTP_407_PROXY_AUTHENTICATION_REQUIRED,
            detail='Permission user'
        )

    users = db.query(user_model.User).filter(
        user_model.User.delete_flag.is_(False)
    ).all()
    return users


def create_a_user(user: user_schemas.UserCreate, token: str, db: Session = Depends(get_db)):
    current_user = auth.get_current_user(token, db)

    if current_user.role_id == '3':
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail='Permission user'
        )

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


def update_user(user_id: str, user_info: user_schemas.UserUpdate, token: str, db: Session):
    print("token ", token)
    try:
        current_user = auth.get_current_user(token, db)

        if current_user.role_id != '1' or user_info.role_id == '1':
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST, detail="Permission user")

        db_user = db.query(user_model.User).filter(
            user_model.User.user_id == user_id).first()

        if db_user is None:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND, detail="Can not find user")

        if user_info.email != db_user.email:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST, detail="Can not change email")

        if user_info.password != user_info.confirm_password:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,
                                detail="Password and confirm password do not match.")

        user_dict = user_info.dict(exclude={"confirm_password"})
        for field, value in user_dict.items():
            setattr(db_user, field, value)

        db.commit()
        db.refresh(db_user)

        return db_user
    except HTTPException as e:
        raise e
    finally:
        db.close()


def delete_user(user_id: str, token: str, db: Session):
    current_user = auth.get_current_user(token, db)

    user = db.query(user_model.User).filter(
        user_model.User.user_id == user_id).first()

    if user is None:
        raise HTTPException(status_code=404, detail="User not found")

    if current_user.user_id == user_id:
        raise HTTPException(status_code=403, detail="Permission denied")

    user.delete_flag = True

    db.commit()
    db.refresh(user)
    return user


def get_current_username(token: str, db: Session):
    user = auth.get_current_user(token, db)
    user.avatar = user.avatar.replace("\\", "/")
    return {"name": user.first_name + " " + user.last_name, "user_id": user.user_id, "avatar": user.avatar}


def save_avatar(token: str, file: UploadFile, db: Session):
    try:
        user = auth.get_current_user(token, db)

        # Đảm bảo folder để lưu hình ảnh tồn tại
        upload_folder = "C:/Users/USER/Documents/2023-dn-PythonTeam1-final-project/front-end/public/assets/avatars"
        os.makedirs(upload_folder, exist_ok=True)

        # Lưu file vào thư mục
        file_path = os.path.join(upload_folder, file.filename)
        with open(file_path, "wb") as image:
            image.write(file.file.read())

        # Lưu đường dẫn file vào cơ sở dữ liệu
        user.avatar = file_path
        db.commit()

        return {"message": "Avatar saved successfully"}

    except Exception as e:
        os.remove(file_path)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error saving avatar: {str(e)}"
        ) from e
    finally:
        db.close()
