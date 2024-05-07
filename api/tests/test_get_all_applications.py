from main import app
from fastapi.testclient import TestClient
from queries.applications_queries import ApplicationRepository

client = TestClient(app)


class EmptyApplicationRepository:
    def get_all_applications(self):
        return {"applications": []}


def test_get_all_applications():
    app.dependency_overrides[ApplicationRepository] = (
        EmptyApplicationRepository
    )
    response = client.get("/api/applications")
    app.dependency_overrides = {}

    assert response.status_code == 200
    assert response.json() == {"applications": []}
