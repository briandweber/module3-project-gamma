from fastapi.testclient import TestClient
from main import app
from queries.tournament_queries import TournamentRepository


client = TestClient(app)


class EmptyTournamentQueries:
    def get_all(self):
        return [
            {
                "id": 2,
                "user_id": 1,
                "event_name": "asdad",
                "roster_size": 10,
                "event_start": "2024-04-24",
                "duration": 10,
                "event_description": "asd",
                "picture_url": "asd",
                "entry_fee": 10,
                "prize": 10,
                "sponsors": "asd",
            }
        ]


def test_get_all_tournaments():
    app.dependency_overrides[TournamentRepository] = EmptyTournamentQueries

    response = client.get("api/tournaments")
    app.dependency_overrides = {}

    assert response.status_code == 200
    assert response.json() == [
        {
            "id": 2,
            "user_id": 1,
            "event_name": "asdad",
            "roster_size": 10,
            "event_start": "2024-04-24",
            "duration": 10,
            "event_description": "asd",
            "picture_url": "asd",
            "entry_fee": 10,
            "prize": 10,
            "sponsors": "asd",
        }
    ]


# def test_init():
#     assert 1 == 1
