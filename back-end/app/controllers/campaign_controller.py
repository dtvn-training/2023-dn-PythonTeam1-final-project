from math import ceil
from datetime import datetime
from fastapi import HTTPException, status
from sqlalchemy.orm import Session, load_only
from ..schemas import campaign_schemas
from ..models import campaign_model, creative_model
from ..controllers import auth_controller as auth
from ..services import campaign_services


def create_a_campaign(campaign: campaign_schemas.CampaignInfo, token: str, db: Session):
    # Authorize user
    user = auth.get_current_user(token, db)
    user_id = user.user_id

    # Insert campaign record
    new_campaign = campaign_services.create_a_campaign_service(
        campaign, user_id, db)

    return new_campaign


def select_a_campaign(campaign_id: str, token: str, db: Session):
    # Authorize user
    user = auth.get_current_user(token, db)
    user_id = user.user_id

    # Select campaign
    selected_campaign = campaign_services.select_a_campaign_service(
        campaign_id, user_id, db)
    return selected_campaign


def select_number_of_pages(token: str, db: Session):
    # Authorize user
    user = auth.get_current_user(token, db)
    user_id = user.user_id

    # Get the number of pages
    number_of_pages = campaign_services.select_number_of_pages_service(
        user_id, token, db)
    return number_of_pages


def select_a_page_campaign(page: int, token: str, db: Session):

    # Authorize user
    user = auth.get_current_user(token, db)
    user_id = user.user_id

    # Get the list of campaign at page
    list_campaign_data = campaign_services.select_a_page_campaign(
        page, user_id, db)

    return list_campaign_data


def update_a_campaign(campaign: campaign_schemas.CampaignUpdate, token: str, db: Session):
    # Authorize user
    user = auth.get_current_user(token, db)
    user_id = user.user_id

    # Update campaign
    updated_campaign = campaign_services.update_a_campaign_service(
        campaign, user_id, db)
    return updated_campaign


def delete_campaigns(campaigns: campaign_schemas.CampaignDelete, token, db: Session):
    # Authorize user
    user = auth.get_current_user(token, db)
    user_id = user.user_id

    # Update delete_flag for each id in list
    list_deleted_campaign = campaign_services.delete_campaigns_service(
        campaigns, user_id, db)
    return list_deleted_campaign


def select_all_campaigns(token: str, db: Session):
    # Authorize user
    user = auth.get_current_user(token, db)
    user_id = user.user_id

    # List all campaigns
    list_campaign_data = campaign_services.select_all_campaigns_service(
        user_id, db)

    return list_campaign_data
