import uuid
from sqlalchemy import Column, Enum
from sqlalchemy.orm import relationship
from sqlalchemy.sql.expression import text
from sqlalchemy.sql.sqltypes import TIMESTAMP
from ..connectDB.database import Base


class Role(Base):
    __tablename__ = "roles"
    role_id = Column(Enum("1", "2", "3"), primary_key=True, default="2")
    role_name = Column(Enum("Admin", "Agency", "Advertiser"),
                       nullable=False, default="Agency")

    users = relationship("User", back_populates='role')
