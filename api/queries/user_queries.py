"""
Database Queries for Users
"""

import os
import psycopg
from psycopg_pool import ConnectionPool
from psycopg.rows import class_row
from typing import Optional, Union
from pydantic import BaseModel
from models.users import UserWithPw, UserRequest, UserResponse
from utils.exceptions import UserDatabaseException
from fastapi import HTTPException

DATABASE_URL = os.environ.get("DATABASE_URL")
if not DATABASE_URL:
    raise ValueError("DATABASE_URL environment variable is not set")

pool = ConnectionPool(DATABASE_URL)


class Error(BaseModel):
    message: str


class UserQueries:
    """
    Class containing queries for the Users table

    Can be dependency injected into a route like so

    def my_route(userQueries: UserQueries = Depends()):
        # Here you can call any of the functions to query the DB
    """

    def update_user(
        self, user_id: int, user: UserRequest
    ) -> Union[UserResponse, Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    cur.execute(
                        """
                        UPDATE users
                        SET username = %s
                            , password = %s
                            , user_type = %s
                            , first_name = %s
                            , last_name = %s
                            , photo_url = %s
                            , phone_number = %s
                            , address = %s
                        WHERE id = %s
                        """,
                        [
                            user.username,
                            user.password,
                            user.user_type,
                            user.first_name,
                            user.last_name,
                            user.photo_url,
                            user.phone_number,
                            user.address,
                            user_id,
                        ],
                    )
                    old_data = user.dict()
                    if 1 == 2:
                        print("right before the exception")
                        return UserResponse(id=user_id, **old_data)
                    else:
                        raise HTTPException(
                            status_code=404, detail="Could not update user"
                        )

        except Exception as e:
            print(e)
            raise HTTPException(
                status_code=404, detail="Could not update user"
            )

    def delete_user(self, user_id: int) -> bool:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        DELETE FROM users
                        WHERE id = %s
                        """,
                        [user_id],
                    )
                    return True
        except psycopg.Error as e:
            print(e)
            return False

    def get_by_username(self, username: str) -> Optional[UserWithPw]:
        """
        Gets a user from the database by username

        Returns None if the user isn't found
        """
        try:
            with pool.connection() as conn:
                with conn.cursor(row_factory=class_row(UserWithPw)) as cur:
                    cur.execute(
                        """
                            SELECT
                                *
                            FROM users
                            WHERE username = %s
                            """,
                        [username],
                    )
                    user = cur.fetchone()
                    if not user:
                        return None
        except psycopg.Error as e:
            print(e)
            raise UserDatabaseException(f"Error getting user {username}")
        return user

    def get_by_id(self, id: int) -> Optional[UserWithPw]:
        """
        Gets a user from the database by user id

        Returns None if the user isn't found
        """
        try:
            with pool.connection() as conn:
                with conn.cursor(row_factory=class_row(UserWithPw)) as cur:
                    cur.execute(
                        """
                            SELECT
                                *
                            FROM users
                            WHERE id = %s
                            """,
                        [id],
                    )
                    user = cur.fetchone()
                    if not user:
                        return None
        except psycopg.Error as e:
            print(e)
            raise UserDatabaseException(f"Error getting user with id {id}")

        return user

    def create_user(
        self,
        username: str,
        hashed_password: str,
        user_type: str,
        first_name: str,
        last_name: str,
        photo_url: str,
        phone_number: str,
        address: str,
    ) -> UserWithPw:
        """
        Creates a new user in the database

        Raises a UserInsertionException if creating the user fails
        """
        try:
            with pool.connection() as conn:
                with conn.cursor(row_factory=class_row(UserWithPw)) as cur:
                    cur.execute(
                        """
                        INSERT INTO users (
                            username,
                            password,
                            user_type,
                            first_name,
                            last_name,
                            photo_url,
                            phone_number,
                            address
                        ) VALUES (
                            %s, %s, %s, %s, %s, %s, %s, %s
                        )
                        RETURNING *;
                        """,
                        [
                            username,
                            hashed_password,
                            user_type,
                            first_name,
                            last_name,
                            photo_url,
                            phone_number,
                            address,
                        ],
                    )
                    user = cur.fetchone()
                    if not user:
                        raise UserDatabaseException(
                            f"Could not create user with username {username}"
                        )
        except psycopg.Error:
            raise UserDatabaseException(
                f"Could not create user with username {username}"
            )
        return user
