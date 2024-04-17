from fastapi import APIRouter, Depends, Response
from typing import List
from queries.tournament_queries import TournamentRepository
from models.tournaments import TournamentResponse, TournamentRequest


router = APIRouter()


@router.post("/tournament_create", response_model=TournamentResponse)
def create_tournament(
    tournament: TournamentRequest,
    response: Response,
    repo: TournamentRepository = Depends(),
):
    # response.status_code = 400
    return repo.create(tournament)


@router.get("/tournament_list", response_model=List[TournamentResponse])
def get_all_tournaments(
    repo: TournamentRepository = Depends(),
):
    return repo.get_all()
