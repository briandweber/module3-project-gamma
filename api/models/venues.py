"""
Pydantic Models for Venues.
"""

from pydantic import BaseModel


class VenueRequest(BaseModel):
    user_id: int
    venue_name: str
    state: str
    street_address: str
    city: str
    zip: int
    photo_url: str
    capacity: int
    special_accommodations: str
    venue_cost: int


class VenueResponse(BaseModel):
    id: int
    user_id: int
    venue_name: str
    state: str
    street_address: str
    city: str
    zip: int
    photo_url: str
    capacity: int
    special_accommodations: str
    venue_cost: int


class VenueUpdate(BaseModel):
    venue_name: str
    street_address: str
    city: str
    zip: int
    state: str
    photo_url: str
    capacity: int
    special_accommodations: str
    venue_cost: int
