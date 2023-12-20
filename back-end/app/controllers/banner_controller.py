from sqlalchemy.orm import Session
from ..controllers.auth_controller import get_current_user
from fastapi import HTTPException, status
from ..models import campaign_model, creative_model
import datetime


def get_banner(token: str, db: Session):
    user = get_current_user(token, db)

    if user is None:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN, detail="User not found"
        )

    try:
        banners = (
            db.query(campaign_model.Campaign)
            .filter(campaign_model.Campaign.status == True,
                    campaign_model.Campaign.delete_flag == False)
            .order_by(campaign_model.Campaign.bid_amount.desc())
            .limit(2)
            .all()
        )

        if len(banners) != 2:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Find not found"
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
        else:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Find not found"
            )

    except HTTPException:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail='Find not found'
        )

    return result


def deduction(token: str, db: Session, campaign_id: str):
    try:
        user = get_current_user(token, db)

        if user is None:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="User not found"
            )

        banner = db.query(campaign_model.Campaign).filter(
            campaign_model.Campaign.campaign_id == campaign_id).first()

        if not banner:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Invalid campaign id"
            )

        new_used_amount = banner.used_amount + banner.bid_amount

        new_usage_rate = (new_used_amount / banner.budget) * 100
        remain = banner.budget - banner.used_amount
        new_status = True

        if banner.end_date == datetime.datetime.now().strftime(
                "%Y-%m-%d %H:%M:%S") or remain < banner.bid_amount:
            new_status = False

        db.query(campaign_model.Campaign).filter_by(
            campaign_id=banner.campaign_id).update(
            {
                "used_amount": new_used_amount,
                "usage_rate": new_usage_rate,
                "status": new_status
            }
        )

        db.commit()

        return {"message": "success"}

    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(e)
        )
    finally:
        db.close()
