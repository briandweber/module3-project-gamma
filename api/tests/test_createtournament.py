from fastapi.testclient import TestClient
from main import app
from queries.tournament_queries import TournamentRepository

client = TestClient(app)


class MockTournamentRepository:
    def create(self, tournament):
        return {
            "id": 1,
            "user_id": 1,
            "location": "sdfas, sadfa, asdfa",
            "event_name": "New Tournament",
            "roster_size": 5,
            "event_start": "2024-01-01",
            "duration": 10,
            "event_description": "A test tournament",
            "picture_url": "http://example.com/image.jpg",
            "entry_fee": 20.0,
            "prize": 500.0,
            "sponsors": "Sample Sponsors",
        }


def test_create_tournament():
    app.dependency_overrides[TournamentRepository] = MockTournamentRepository
    tournament_data = {
        "user_id": 1,
        "location": "sdfas, sadfa, asdfa",
        "event_name": "New Tournament",
        "roster_size": 5,
        "event_start": "2024-01-01",
        "duration": 10,
        "event_description": "A test tournament",
        "picture_url": "http://example.com/image.jpg",
        "entry_fee": 20.0,
        "prize": 500.0,
        "sponsors": "Sample Sponsors",
    }

    response = client.post("/api/tournaments", json=tournament_data)

    assert response.status_code == 200
    assert response.json() == {
        "id": 1,
        "user_id": 1,
        "location": "sdfas, sadfa, asdfa",
        "event_name": "New Tournament",
        "roster_size": 5,
        "event_start": "2024-01-01",
        "duration": 10,
        "event_description": "A test tournament",
        "picture_url": "http://example.com/image.jpg",
        "entry_fee": 20.0,
        "prize": 500.0,
        "sponsors": "Sample Sponsors",
    }

    app.dependency_overrides.clear()
