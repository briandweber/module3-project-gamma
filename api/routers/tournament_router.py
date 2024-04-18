from fastapi import APIRouter, Depends, Response, HTTPException
from typing import List
from queries.tournament_queries import TournamentRepository
from models.tournaments import TournamentResponse, TournamentRequest


router = APIRouter(tags=["Tournaments"], prefix="/api")


@router.post("/tournaments", response_model=TournamentResponse)
def create_tournament(
    tournament: TournamentRequest,
    response: Response,
    repo: TournamentRepository = Depends(),
):
    # response.status_code = 400
    return repo.create(tournament)


@router.get("/tournaments", response_model=List[TournamentResponse])
def get_all_tournaments(
    repo: TournamentRepository = Depends(),
):
    return repo.get_all()


repo = TournamentRepository()


@router.get("/tournaments/{item_id}", response_model=TournamentResponse)
def get_tournament_details(item_id: int):
    """
    Get details of a specific tournament by its ID.
    """
    tournament = repo.get_by_id(
        item_id
    )
    if not tournament:
        raise HTTPException(status_code=404, detail="Tournament not found")
    return tournament


@router.delete("/tournaments/{tournament_id}", status_code=204)
def delete_tournament(tournament_id: int):
    """
    Delete a tournament by its ID.
    """
    deleted = repo.delete_by_id(
        tournament_id
    )
    if not deleted:
        raise HTTPException(status_code=404, detail="Tournament not found")


@router.put("/tournaments/{tournament_id}", response_model=TournamentResponse)
def update_tournament(
    tournament_id: int, updated_tournament: TournamentRequest
):
    """
    Update a tournament by its ID.
    """
    existing_tournament = repo.get_by_id(
        tournament_id
    )
    if not existing_tournament:
        raise HTTPException(status_code=404, detail="Tournament not found")
    existing_tournament.id = tournament_id
    existing_tournament.event_name = updated_tournament.event_name
    existing_tournament.event_start = updated_tournament.event_start
    existing_tournament.roster_size = updated_tournament.roster_size
    existing_tournament.duration = updated_tournament.duration
    existing_tournament.event_description = (
        updated_tournament.event_description
    )
    existing_tournament.picture_url = updated_tournament.picture_url
    existing_tournament.entry_fee = updated_tournament.entry_fee
    existing_tournament.prize = updated_tournament.prize
    existing_tournament.sponsors = updated_tournament.sponsors

    repo.save(existing_tournament)

    return existing_tournament
