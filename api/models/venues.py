"""
Pydantic Models for Venues.
"""

from pydantic import BaseModel


class VenueRequest(BaseModel):
    user_id: int
    venue_name: str
    state: str
    address: str
    photo_url: str
    capacity: int
    special_accommodations: str
    venue_cost: int


class VenueResponse(BaseModel):
    id: int
    user_id: int
    venue_name: str
    state: str
    address: str
    photo_url: str
    capacity: int
    special_accommodations: str
    venue_cost: int


class VenueUpdate(BaseModel):
    venue_name: str
    address: str
    state: str
    photo_url: str
    capacity: int
    special_accommodations: str
    venue_cost: int
