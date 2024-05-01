from main import app
from fastapi.testclient import TestClient
from queries.applications_queries import ApplicationRepository

client = TestClient(app)


class EmptyApplications:
    def get_all_applications(self):
        return {"applications": []}


def test_get_all_applications():
    app.dependency_overrides[ApplicationRepository] = EmptyApplications

    response = client.get("/api/applications")
    app.dependency_overrides = {}

    assert response.status_code == 200
    assert response.json() == {"applications": []}


class CreateApplication:
    def create_application(self, application):
        result = {
            "id": 63,
            "tournament_id": 3,
            "user_id": 6,
            "status": "string",
        }

        result.update(application)
        return result


def test_create_application():
    app.dependency_overrides[ApplicationRepository] = CreateApplication
    application = {"tournament_id": 3, "user_id": 6, "status": "string"}

    expected = {"id": 63, "tournament_id": 3, "user_id": 6, "status": "string"}

    response = client.post("/api/applications", json=application)
    app.dependency_overrides = {}

    assert response.status_code == 200
    assert response.json() == expected
