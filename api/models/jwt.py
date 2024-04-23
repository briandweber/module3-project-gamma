"""
Pydantic Models for the JWT Payload
"""

from pydantic import BaseModel


class JWTUserData(BaseModel):
    """
    Represents the user data we store in the JWT itself
    It's important to store the id so we can make DB calls
    without looking up the id in the users table
    """

    id: int
    username: str
    user_type: str
    first_name: str
    last_name: str
    photo_url: str
    phone_number: str
    address: str


# This represents the payload stored inside the JWT
class JWTPayload(BaseModel):
    """
    The payload of the JWT
    """

    user: JWTUserData
    sub: str
    exp: int
