from main import app
from fastapi.testclient import testclient

client = testclient(app)
