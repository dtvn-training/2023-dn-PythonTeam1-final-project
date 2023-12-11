import uuid
from sqlalchemy import Column, ForeignKey, Enum, String, Boolean
from sqlalchemy.orm import relationship
from sqlalchemy.sql.expression import text
from sqlalchemy.sql.sqltypes import TIMESTAMP
from ..connectDB.database import Base


class User(Base):
    __tablename__ = "users"

    user_id = Column(String(36), primary_key=True,
                     default=lambda: str(uuid.uuid4()))
    email = Column(String(100), nullable=False, unique=True)
    password = Column(String(256), nullable=False)
    first_name = Column(String(100), nullable=False)
    last_name = Column(String(100), nullable=False)
    role_id = Column(Enum("1", "2", "3"), ForeignKey(
        'roles.role_id'), nullable=False)
    address = Column(String(200), nullable=False)
    phone = Column(String(15), nullable=False)
    avatar = Column(String(200))
    actions = Column(String(200))
    created_at = Column(TIMESTAMP(timezone=True),
                        nullable=False, server_default=text('now()'))
    updated_at = Column(TIMESTAMP(timezone=True),
                        nullable=False, server_default=text('now()'))
    delete_flag = Column(Boolean, nullable=False, default=False)

    role = relationship("Role", back_populates="users")
    campaigns = relationship("Campaign", back_populates="user")
