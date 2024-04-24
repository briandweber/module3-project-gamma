"""
Pydantic Models for Tournaments.
"""

from datetime import date
from pydantic import BaseModel


class TournamentRequest(BaseModel):
    user_id: int
    event_name: str
    roster_size: int
    event_start: date
    duration: int
    event_description: str
    picture_url: str
    entry_fee: float
    prize: float
    sponsors: str


class TournamentResponse(BaseModel):
    id: int
    user_id: int
    event_name: str
    roster_size: int
    event_start: date
    duration: int
    event_description: str
    picture_url: str
    entry_fee: float
    prize: float
    sponsors: str


class TournamentUpdate(BaseModel):
    event_name: str
    roster_size: int
    event_start: date
    duration: int
    event_description: str
    picture_url: str
    entry_fee: float
    prize: float
    sponsors: str
