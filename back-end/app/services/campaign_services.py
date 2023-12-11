from math import ceil
from datetime import datetime
from fastapi import HTTPException, status
from sqlalchemy import desc
from sqlalchemy.orm import Session, load_only
from ..schemas import campaign_schemas
from ..models import campaign_model, creative_model


def create_a_campaign_service(campaign: campaign_schemas.CampaignInfo, user_id: str, db: Session):
    try:
        campaign_dict = campaign.dict()
        campaign_dict["user_id"] = user_id
        campaign_dict["start_date"] = convertStrToDatetime(
            campaign_dict["start_date"])
        campaign_dict["end_date"] = convertStrToDatetime(
            campaign_dict["end_date"])
        campaign_dict['name'] = campaign_dict['campaign_name']
        del campaign_dict['campaign_name']
        creative_dict = campaign_dict['creative']
        del campaign_dict['creative']
        new_campaign = campaign_model.Campaign(**campaign_dict)
        db.add(new_campaign)
        db.commit()
        db.refresh(new_campaign)

        creative_dict['campaign_id'] = new_campaign.campaign_id
        new_creative = creative_model.Creative(**creative_dict)

        db.add(new_creative)
        db.commit()
        db.refresh(new_creative)

    except:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="Campaign isn't created")
    return new_campaign


def select_a_campaign_service(campaign_id: str, user_id: str, db: Session):
    campaign_selected_columns = [
        campaign_model.Campaign.campaign_id,
        campaign_model.Campaign.name,
        campaign_model.Campaign.status,
        campaign_model.Campaign.used_amount,
        campaign_model.Campaign.usage_rate,
        campaign_model.Campaign.budget,
        campaign_model.Campaign.bid_amount,
        campaign_model.Campaign.start_date,
        campaign_model.Campaign.end_date
    ]
    creative_selected_columns = [
        creative_model.Creative.title,
        creative_model.Creative.description,
        creative_model.Creative.img_preview,
        creative_model.Creative.url,
    ]

    campaign = db.query(campaign_model.Campaign)\
        .options(load_only(*campaign_selected_columns))\
        .filter(campaign_model.Campaign.user_id == user_id, campaign_model.Campaign.campaign_id == campaign_id, campaign_model.Campaign.delete_flag == False).first()
    creative = db.query(creative_model.Creative)\
        .options(load_only(*creative_selected_columns))\
        .filter(creative_model.Creative.campaign_id == campaign_id, creative_model.Creative.delete_flag == False).first()
    if not campaign:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="Not Found Campaign")
    campaign.start_date = convertDatetimeToStr(campaign.start_date)
    campaign.end_date = convertDatetimeToStr(campaign.end_date)

    campaign_data_parse = {
        "campaign_id": campaign.campaign_id,
        "name": campaign.name,
        "status": campaign.status,
        "used_amount": campaign.used_amount,
        "usage_rate": campaign.usage_rate,
        "budget": campaign.budget,
        "bid_amount": campaign.bid_amount,
        "start_date": campaign.start_date,
        "end_date": campaign.end_date,
        "creative": {
            "title": creative.title,
            "description": creative.description,
            "img_preview": creative.img_preview,
            "url": creative.url
        }
    }
    return campaign_data_parse


def select_number_of_pages_service(user_id: str, db: Session):
    RECORDS_EACH_PAGE = 3
    number_of_records = db.query(campaign_model.Campaign.campaign_id).filter(
        campaign_model.Campaign.user_id == user_id, campaign_model.Campaign.delete_flag == False).count()

    if not number_of_records:
        raise HTTPException(
            status_code=status.HTTP_404_BAD_REQUEST, detail="Not Found any pages")
    number_of_pages = ceil(number_of_records / RECORDS_EACH_PAGE)
    return number_of_pages


def select_a_page_campaign(page: int, user_id: str, db: Session):
    RECORDS_EACH_PAGE = 3
    OFFSET_RECORDS = RECORDS_EACH_PAGE * (page - 1)
    list_campaign = db.query(campaign_model.Campaign)\
        .filter(campaign_model.Campaign.user_id == user_id, campaign_model.Campaign.delete_flag == False)\
        .order_by(desc(campaign_model.Campaign.status), campaign_model.Campaign.created_at)\
        .limit(RECORDS_EACH_PAGE).offset(OFFSET_RECORDS).all()

    if not list_campaign:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail="Not Found any Campaigns")
    list_campaign_data_parse = list()
    for campaign in list_campaign:
        campaign.start_date = convertDatetimeToStr(campaign.start_date)
        campaign.end_date = convertDatetimeToStr(campaign.end_date)
        creative = db.query(creative_model.Creative)\
            .filter(creative_model.Creative.campaign_id == campaign.campaign_id, creative_model.Creative.delete_flag == False).first()

        campaign_data_parse = {
            "campaign_id": campaign.campaign_id,
            "name": campaign.name,
            "status": campaign.status,
            "used_amount": campaign.used_amount,
            "usage_rate": campaign.usage_rate,
            "budget": campaign.budget,
            "bid_amount": campaign.bid_amount,
            "start_date": campaign.start_date,
            "end_date": campaign.end_date,
            "creative": {
                "title": creative.title,
                "description": creative.description,
                "img_preview": creative.img_preview,
                "url": creative.url
            }
        }
        list_campaign_data_parse.append(campaign_data_parse)


def update_a_campaign_service(campaign: campaign_schemas.CampaignUpdate, user_id: str, db: Session):
    campaign_record = db.query(campaign_model.Campaign).filter(
        campaign_model.Campaign.campaign_id == campaign.campaign_id,
        campaign_model.Campaign.user_id == user_id, campaign_model.Campaign.delete_flag == False).first()

    if not campaign_record:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Not found campaign")

    creative_record = db.query(creative_model.Creative).filter(
        creative_model.Creative.campaign_id == campaign_record.campaign_id).first()
    # Update data
    try:
        campaign_record.name = campaign.campaign_name
        campaign_record.status = campaign.status
        campaign_record.budget = campaign.budget
        campaign_record.bid_amount = campaign.bid_amount
        campaign_record.start_date = convertStrToDatetime(campaign.start_date)
        campaign_record.end_date = convertStrToDatetime(campaign.end_date)
        campaign_record.updated_at = convertStrToDatetime(campaign.update_at)

        creative = campaign.creative
        creative_record.title = creative.title
        creative_record.description = creative.description
        creative_record.img_preview = creative.img_preview
        creative_record.url = creative.url
        creative_record.updated_at = campaign_record.updated_at
        campaign_data_parse = {
            "name": campaign_record.name,
            "status": campaign_record.status,
            "used_amount": campaign_record.used_amount,
            "usage_rate": campaign_record.usage_rate,
            "budget": campaign_record.budget,
            "bid_amount": campaign_record.bid_amount,
            "start_date": campaign_record.start_date,
            "end_date": campaign_record.end_date,
            "creative": {
                "title": creative_record.title,
                "description": creative_record.description,
                "img_preview": creative_record.img_preview,
                "url": creative_record.url
            }
        }
        db.commit()
        db.refresh(campaign_record)

        return campaign_data_parse
    except:
        HTTPException(status_code=status.HTTP_400_BAD_REQUEST,
                      detail="Campaign isn't updated")


def delete_campaigns_service(campaigns: campaign_schemas.CampaignDelete, user_id, db: Session):
    list_deleted_campaigns = []
    try:
        for campaign_id in campaigns.campaign_ids:
            campaign_record = db.query(campaign_model.Campaign).filter(
                campaign_model.Campaign.campaign_id == campaign_id,
                campaign_model.Campaign.user_id == user_id, campaign_model.Campaign.delete_flag == False).first()
            creative_record = db.query(creative_model.Creative).filter(
                creative_model.Creative.campaign_id == campaign_record.campaign_id).first()
            if not campaign_record:
                raise HTTPException(
                    status_code=status.HTTP_404_NOT_FOUND, detail="Not found campaign")
            campaign_record.delete_flag = True
            db.commit()
            db.refresh(campaign_record)
            campaign_data_parse = {
                "campaign_id": campaign_id,
                "name": campaign_record.name,
                "status": campaign_record.status,
                "used_amount": campaign_record.used_amount,
                "usage_rate": campaign_record.usage_rate,
                "budget": campaign_record.budget,
                "bid_amount": campaign_record.bid_amount,
                "start_date": campaign_record.start_date,
                "end_date": campaign_record.end_date,
                "creative": {
                    "title": creative_record.title,
                    "description": creative_record.description,
                    "img_preview": creative_record.img_preview,
                    "url": creative_record.url
                }
            }
            list_deleted_campaigns.append(campaign_data_parse)

        return list_deleted_campaigns

    except:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="Delete failed")


def select_all_campaigns_service(user_id: str, db: Session):
    list_campaign = db.query(campaign_model.Campaign)\
        .filter(campaign_model.Campaign.user_id == user_id, campaign_model.Campaign.delete_flag == False)\
        .order_by(desc(campaign_model.Campaign.status), campaign_model.Campaign.created_at)\
        .all()

    if not list_campaign:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail="Not Found any Campaigns")
    list_campaign_data_parse = list()
    for campaign in list_campaign:
        campaign.start_date = convertDatetimeToStr(campaign.start_date)
        campaign.end_date = convertDatetimeToStr(campaign.end_date)
        creative = db.query(creative_model.Creative)\
            .filter(creative_model.Creative.campaign_id == campaign.campaign_id, creative_model.Creative.delete_flag == False).first()

        campaign_data_parse = {
            "campaignId": campaign.campaign_id,
            "campaignName": campaign.name,
            "status": campaign.status,
            "usedAmount": campaign.used_amount,
            "usageRate": campaign.usage_rate,
            "budget": campaign.budget,
            "bidAmount": campaign.bid_amount,
            "startDate": campaign.start_date,
            "endDate": campaign.end_date,
            "creative": {
                "title": creative.title,
                "description": creative.description,
                "imgPreview": creative.img_preview,
                "url": creative.url
            }
        }
        list_campaign_data_parse.append(campaign_data_parse)
    return list_campaign_data_parse


def convertStrToDatetime(datetime_str: str | None):
    if datetime_str == "":
        return ""
    return datetime.strptime(datetime_str, "%Y-%m-%d %H:%M")


def convertDatetimeToStr(datetime_obj: datetime | None):
    return datetime_obj.strftime("%Y-%m-%d %H:%M")
