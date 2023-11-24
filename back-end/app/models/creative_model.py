import uuid
from sqlalchemy import Column, ForeignKey, Integer, Float, String, Boolean
from sqlalchemy.orm import relationship
from sqlalchemy.sql.expression import text
from sqlalchemy.sql.sqltypes import TIMESTAMP
from ..connectDB.database import Base


class Creative(Base):
    __tablename__ = "creatives"

    creative_id = Column(String(36), primary_key=True, default=uuid.uuid4())
    title = Column(String(200), nullable=False)
    description = Column(String(500))
    img_preview = Column(String(200), nullable=False)

    campaign_id = Column(String(36), ForeignKey(
        'campaigns.campaign_id'), nullable=False)

    created_at = Column(TIMESTAMP(timezone=True),
                        nullable=False, server_default=text('now()'))
    updated_at = Column(TIMESTAMP(timezone=True),
                        nullable=False, server_default=text('now()'))
    delete_flag = Column(Boolean, nullable=False, default=False)

    campaign = relationship('Campaign', back_populates="creatives")
