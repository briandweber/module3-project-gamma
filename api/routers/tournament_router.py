from fastapi import APIRouter, Depends, Response
from typing import List
from queries.tournament_queries import TournamentRepository
from models.tournaments import TournamentResponse, TournamentRequest


router = APIRouter(prefix="/api")


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
