from fastapi import APIRouter, Depends, Response, HTTPException
from queries.applications_queries import ApplicationRepository
from models.applications import (
    ApplicationResponse,
    ApplicationRequest,
    ApplicationsOut,
)


router = APIRouter(tags=["Applications"], prefix="/api")


@router.post("/applications", response_model=ApplicationResponse)
def create_application(
    application: ApplicationRequest,
    response: Response,
    repo: ApplicationRepository = Depends(),
):
    # response.status_code = 400
    return repo.create_application(application)


@router.get("/applications", response_model=ApplicationsOut)
def get_all_applications(
    repo: ApplicationRepository = Depends(),
):
    return repo.get_all_applications()


@router.get("/applications/{id}", response_model=ApplicationResponse)
def get_application_by_id(id: int, repo: ApplicationRepository = Depends()):
    try:
        application = repo.get_application_by_id(id)
        if not application:
            raise HTTPException(
                status_code=404, detail="Application not found"
            )
        return application
    except Exception as error:
        raise HTTPException(status_code=500, detail=str(error))


@router.put("/applications/{id}", response_model=ApplicationResponse)
def update_application(
    id: int,
    application: ApplicationRequest,
    repo: ApplicationRepository = Depends(),
):
    try:
        updated_application = repo.update_application(id, application)
        return updated_application
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))
    except Exception as error:
        raise HTTPException(status_code=500, detail=str(error))


@router.delete("/applications/{id}", status_code=204)
def delete_application(id: int, repo: ApplicationRepository = Depends()):
    deleted = repo.delete_application(id)
    if not deleted:
        raise HTTPException(status_code=404, detail="Application not found")
