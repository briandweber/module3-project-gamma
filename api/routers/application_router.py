from fastapi import APIRouter, Depends, Response
from typing import List
from queries.applications_queries import ApplicationRepository
from models.applications import ApplicationResponse, ApplicationRequest


router = APIRouter(tags=["Applications"], prefix="/api")


@router.post("/applications", response_model=ApplicationResponse)
def create_application(
    application: ApplicationRequest,
    response: Response,
    repo: ApplicationRepository = Depends(),
):
    # response.status_code = 400
    return repo.create_application(application)


@router.get("/applications", response_model=List[ApplicationResponse])
def get_all_applications(
    repo: ApplicationRepository = Depends(),
):
    return repo.get_all_applications()
