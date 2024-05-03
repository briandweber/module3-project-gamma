from fastapi import APIRouter, Depends, Response, HTTPException
from typing import List
from queries.venue_queries import VenueRepository
from models.venues import (
    VenueResponse,
    VenueRequest,
    VenueUpdate
)


router = APIRouter(tags=["Venue"], prefix="/api")


@router.post("/venues", response_model=VenueResponse)
def create_venue(
    venue: VenueRequest,
    response: Response,
    repo: VenueRepository = Depends(),
):
    """
    Create a venue.
    """
    # response.status_code = 400
    return repo.create(venue)


@router.get("/venues", response_model=List[VenueResponse])
def get_all_venues(
    repo: VenueRepository = Depends(),
):
    """
    Get list of all venues.
    """
    return repo.get_all()


repo = VenueRepository()


@router.get("/venues/{item_id}", response_model=VenueResponse)
def get_venue_details(item_id: int):
    """
    Get details of a specific venue by its ID.
    """
    venue = repo.get_by_id(item_id)
    if not venue:
        raise HTTPException(status_code=404, detail="venue not found")
    return venue


@router.get("/venues/user/{user_id}")
def get_venues_by_user(user_id: int):
    """
    Get venues associated with a specific user.
    """
    venues = repo.get_venues_by_user(user_id)
    if not venues:
        raise HTTPException(status_code=404, detail="User has no venues")
    return venues


@router.delete("/venues/{venue_id}", status_code=204)
def delete_venue(venue_id: int):
    """
    Delete a venue by its ID.
    """
    deleted = repo.delete_by_id(venue_id)
    if not deleted:
        raise HTTPException(status_code=404, detail="venue not found")


@router.put("/venues/{venue_id}", response_model=VenueResponse)
def update_venue(
    venue_id: int, updated_venue: VenueUpdate
):
    """
    Update a venue by its ID.
    """
    existing_venue = repo.get_by_id(venue_id)
    if not existing_venue:
        raise HTTPException(status_code=404, detail="venue not found")
    existing_venue.id = venue_id
    existing_venue.user_id = existing_venue.user_id
    existing_venue.venue_name = updated_venue.venue_name
    existing_venue.state = updated_venue.state
    existing_venue.address = updated_venue.address
    existing_venue.photo_url = updated_venue.photo_url
    existing_venue.capacity = updated_venue.capacity
    existing_venue.special_accommodations = (
        updated_venue.special_accommodations
    )
    existing_venue.venue_cost = updated_venue.venue_cost
    repo.save(existing_venue)
    return existing_venue
