from fastapi.testclient import TestClient
from main import app
from queries.tournament_queries import TournamentRepository
from datetime import date

client = TestClient(app)

class MockTournamentRepository:
    def create(self, tournament):
        return {
            "id": 1,
            "user_id": 1,
            "event_name": "New Tournament",
            "roster_size": 5,
            "event_start": "2024-01-01",
            "duration": 10,
            "event_description": "A test tournament",
            "picture_url": "http://example.com/image.jpg",
            "entry_fee": 20.0,
            "prize": 500.0,
            "sponsors": "Sample Sponsors"
        }

def test_create_tournament():

    app.dependency_overrides[TournamentRepository] = MockTournamentRepository

    tournament_data = {
        "user_id": 1,
        "event_name": "New Tournament",
        "roster_size": 5,
        "event_start": "2024-01-01",
        "duration": 10,
        "event_description": "A test tournament",
        "picture_url": "http://example.com/image.jpg",
        "entry_fee": 20.0,
        "prize": 500.0,
        "sponsors": "Sample Sponsors"
    }

    response = client.post("/api/tournaments", json=tournament_data)

    assert response.status_code == 200
    assert response.json() == {
        "id": 1,
        "user_id": 1,
        "event_name": "New Tournament",
        "roster_size": 5,
        "event_start": "2024-01-01",
        "duration": 10,
        "event_description": "A test tournament",
        "picture_url": "http://example.com/image.jpg",
        "entry_fee": 20.0,
        "prize": 500.0,
        "sponsors": "Sample Sponsors"
    }

    app.dependency_overrides.clear()


# Make sure to adjust the import path for the dependency override if needed


# import pytest
# from fastapi.testclient import TestClient
# from main import app  # make sure this imports your FastAPI app correctly
# from unittest.mock import patch
# from datetime import date

# client = TestClient(app)

# @pytest.fixture
# def mock_tournament_repo():
#     # Patching the TournamentRepository in the context where it is used
#     with patch('tournament_routers.TournamentRepository') as mock:
#         # Configure the mock to return a preset value when the create method is called
#         mock.return_value.create.return_value = {
#             "id": 1,
#             "user_id": 1,
#             "event_name": "New Tournament",
#             "roster_size": 5,
#             "event_start": date.today(),
#             "duration": 10,
#             "event_description": "A test tournament",
#             "picture_url": "http://example.com/image.jpg",
#             "entry_fee": 20.0,
#             "prize": 500.0,
#             "sponsors": "Sample Sponsors"
#         }
#         yield mock

# def test_create_tournament(mock_tournament_repo):
#     # Test data for creating a tournament
#     tournament_data = {
#         "user_id": 1,
#         "event_name": "New Tournament",
#         "roster_size": 5,
#         "event_start": "2024-01-01",
#         "duration": 10,
#         "event_description": "A test tournament",
#         "picture_url": "http://example.com/image.jpg",
#         "entry_fee": 20.0,
#         "prize": 500.0,
#         "sponsors": "Sample Sponsors"
#     }

#     # Send POST request
#     response = client.post("/api/tournaments", json=tournament_data)

#     # Validate the response
#     assert response.status_code == 200
#     assert response.json() == {
#         "id": 1,
#         "user_id": 1,
#         "event_name": "New Tournament",
#         "roster_size": 5,
#         "event_start": "2024-01-01",
#         "duration": 10,
#         "event_description": "A test tournament",
#         "picture_url": "http://example.com/image.jpg",
#         "entry_fee": 20.0,
#         "prize": 500.0,
#         "sponsors": "Sample Sponsors"
#     }

#     # Ensure the create method was called with the correct parameters
#     mock_tournament_repo.return_value.create.assert_called_once()
