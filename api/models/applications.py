"""
Pydantic Models for Applications.
"""

from pydantic import BaseModel


class ApplicationRequest(BaseModel):
    tournament_id: int
    user_id: int
    status: str


class ApplicationResponse(BaseModel):
    id: int
    tournament_id: int
    user_id: int
    status: str


class ApplicationsOut(BaseModel):
    applications: list[ApplicationResponse]
