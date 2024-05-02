"""
Pydantic Models for Users.
"""

from pydantic import BaseModel


class UserRequest(BaseModel):
    """
    Represents a the parameters needed to create a new user
    """

    username: str
    password: str
    user_type: str
    first_name: str
    last_name: str
    photo_url: str
    phone_number: str
    address: str


class UserResponse(BaseModel):
    """
    Represents a user, with the password not included
    """

    id: int
    username: str
    user_type: str
    first_name: str
    last_name: str
    photo_url: str
    phone_number: str
    address: str


class UserResponseOut(BaseModel):
    """
    Represents a user, with the password not included
    """

    username: str
    user_type: str
    first_name: str
    last_name: str
    photo_url: str
    phone_number: str
    address: str


class SignInRequest(BaseModel):
    username: str
    password: str


class SignInResponse(BaseModel):
    id: int
    username: str
    user_type: str


class UserWithPw(BaseModel):
    """
    Represents a user with password included
    """

    id: int
    username: str
    password: str
    user_type: str
    first_name: str
    last_name: str
    photo_url: str
    phone_number: str
    address: str
