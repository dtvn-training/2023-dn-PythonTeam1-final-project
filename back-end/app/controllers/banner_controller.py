from sqlalchemy.orm import Session
from ..controllers.auth_controller import get_current_user
from fastapi import HTTPException, status
from ..models import campaign_model, creative_model
import datetime


def get_banner(token: str, db: Session):
    user = get_current_user(token, db)

    if user is None:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="User not found")

    while True:
        try:
            banners = (
                db.query(campaign_model.Campaign)
                .filter(campaign_model.Campaign.status == True)
                .order_by(campaign_model.Campaign.bid_amount.desc())
                .limit(2)
                .all()
            )

            if len(banners) != 2:
                raise HTTPException(
                    status_code=status.HTTP_404_NOT_FOUND,
                    detail="Missing image"
                )

            first_campaign, second_campaign = [
                {
                    "campaign_id": banner.campaign_id,
                    "bid_amount": banner.bid_amount,
                    "budget": banner.budget,
                    "end_date": banner.end_date,
                    "used_amount": banner.used_amount
                }
                for banner in banners]

            creatives = (
                db.query(creative_model.Creative)
                .filter(
                    (creative_model.Creative.campaign_id == first_campaign["campaign_id"]) |
                    (creative_model.Creative.campaign_id == second_campaign["campaign_id"]))
                .all()
            )

            if creatives:
                result = [
                    {
                        "campaign_id": creative.campaign_id,
                        "url": creative.url,
                        "img_preview": creative.img_preview
                    }
                    for creative in creatives
                ]

            first_used_amount = first_campaign["used_amount"] + \
                first_campaign["bid_amount"]
            first_usage_rate = (
                first_campaign["bid_amount"] / first_campaign["budget"]) * 100
            first_remain = first_campaign["budget"] - \
                first_campaign["used_amount"]

            if first_campaign["end_date"] == datetime.datetime.now().strftime(
                    "%Y-%m-%d %H:%M:%S") or first_remain < first_campaign["bid_amount"]:
                first_status = False

            second_used_amount = second_campaign["used_amount"] + \
                second_campaign["bid_amount"]
            second_usage_rate = (
                second_campaign["bid_amount"] / second_campaign["budget"]) * 100
            second_remain = second_campaign["budget"] - \
                second_campaign["used_amount"]

            if second_campaign["end_date"] == datetime.datetime.now().strftime(
                    "%Y-%m-%d %H:%M:%S") or second_remain < second_campaign["bid_amount"]:
                second_status = False

            db.query(campaign_model.Campaign).filter_by(
                campaign_id=first_campaign["campaign_id"]).update(
                {
                    "used_amount": first_used_amount,
                    "usage_rate": first_usage_rate,
                    "status": first_status
                }
            )

            db.query(campaign_model.Campaign).filter_by(
                campaign_id=second_campaign["campaign_id"]).update(
                {
                    "used_amount": second_used_amount,
                    "usage_rate": second_usage_rate,
                    "status": second_status
                }
            )

            db.commit()

        except HTTPException:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail='Find not found'
            )

        return result
