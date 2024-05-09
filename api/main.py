"""
Entry point for the FastAPI Application
"""

# from fastapi.staticfiles import StaticFiles
# from UserInDB import get_current_active_user
from fastapi import (
    FastAPI,
    # Depends,
    # File,
    # UploadFile,
)
from fastapi.middleware.cors import CORSMiddleware

# from PIL import Image
# import secrets
from routers import (
    auth_router,
    tournament_router,
    application_router,
    venue_router,
)
import os

app = FastAPI()

# app.mount("/static", StaticFiles(directory="static"), name="static")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[os.environ.get("CORS_HOST", "http://localhost:5173")],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router.router)
app.include_router(venue_router.router)
app.include_router(tournament_router.router)
app.include_router(application_router.router)


@app.get("/api/launch-details")
def launch_details():
    return {
        "launch_details": {
            "module": 3,
            "week": 17,
            "day": 5,
            "hour": 19,
            "min": "00",
        }
    }


# @app.post("/uploadfile/profile")
# async def create_upload_file(
#     file: UploadFile = File(...),
#     requesting_user: UserInDB = Depends(get_current_active_user),
#     user_repo: UsersRepository = Depends(get_repository(UsersRepository)),
# ):

#     FILEPATH = "./static/images/"
#     filename = file.filename
#     extension = filename.split(".")[1]

#     if extension not in ["png", "jpg", "jpeg"]:
#         return {"status": "error", "detail": "File extension not allowed"}

#     token_name = secrets.token_hext(10) + "." + extension
#     generated_name = FILEPATH + token_name
#     file_content = await file.read()

#     with open(generated_name, "wb") as file:
#         file.write(file_content)

#     # PILLOW
#     img = Image.open(generated_name)
#     MAX_SIZE = (200, 200)
#     img.thumbnail(MAX_SIZE)
#     img.save(generated_name)
#     generated_name_split = generated_name.split("./")
#     photo_url = generated_name_split[1]
#     profile_url = {"profile_pic": photo_url}
#     profile_update = dict(requesting_user)
#     profile_update.update(profile_url)
#     update_user = await user_repo.update_profile(
#         profile=requesting_user, profile_update=profile_update
#     )
#     file.close()

# business = await Business.get(owner=user)
# owner = await business.owner

# if owner == user:
#     business.logo = token_name
#     await business.save()
# else:
#     raise HTTPException(
#         status_code=HTTP_401_UNATHORIZED,
#         detail="Not authenticated to perform this action",
#         headers={"WWW-Authenticate": "Bearer"},
#     )

# file_url = "localhost:8000" + generated_name[1:]
# return {"status": "okay", "filename": file_url}
