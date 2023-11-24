import uuid
from sqlalchemy import Column, ForeignKey, Integer, Float, String, Boolean
from sqlalchemy.orm import relationship
from sqlalchemy.sql.expression import text
from sqlalchemy.sql.sqltypes import TIMESTAMP
from ..connectDB.database import Base


class Campaign(Base):
    __tablename__ = "campaigns"

    campaign_id = Column(String(36), primary_key=True, default=uuid.uuid4())
    name = Column(String(200), nullable=False)
    status = Column(Boolean, default=False)
    budget = Column(Integer, nullable=False)
    bid_amount = Column(Integer, nullable=False)
    used_amount = Column(Integer, nullable=False, default=0)
    usage_rate = Column(Float, nullable=False, default=0)

    user_id = Column(String(36), ForeignKey('users.user_id'), nullable=False)

    start_date = Column(TIMESTAMP(timezone=True),
                        nullable=False, server_default=text('now()'))
    end_date = Column(TIMESTAMP(timezone=True),
                      nullable=False, server_default=text('now()'))
    created_at = Column(TIMESTAMP(timezone=True),
                        nullable=False, server_default=text('now()'))
    updated_at = Column(TIMESTAMP(timezone=True),
                        nullable=False, server_default=text('now()'))
    delete_flag = Column(Boolean, nullable=False, default=False)

    creatives = relationship("Creative", back_populates="campaign")
    user = relationship("User", back_populates="campaigns")
