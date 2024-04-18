"""
Database Queries for Applications
"""

import os
from psycopg_pool import ConnectionPool
from typing import Optional
from models.applications import (
    ApplicationRequest,
    ApplicationResponse,
    ApplicationsOut,
)

DATABASE_URL = os.environ.get("DATABASE_URL")
if not DATABASE_URL:
    raise ValueError("DATABASE_URL environment variable is not set")

pool = ConnectionPool(DATABASE_URL)


class ApplicationRepository:
    def get_all_applications(self) -> ApplicationsOut:
        try:
            # connect the database
            with pool.connection() as conn:
                # get cursor
                with conn.cursor() as db:
                    # run our insert statement
                    db.execute(
                        """
                        SELECT

                        id, tournament_id, user_id, status

                        FROM applications
                        ORDER BY id
                        """
                    )
                    # for record in db:
                    #     print(record)
                    records = db.fetchall()

            # Create a list of ApplicationResponse objects
            applications = []
            for record in records:
                application = ApplicationResponse(
                    id=record[0],
                    tournament_id=record[1],
                    user_id=record[2],
                    status=record[3],
                )
                applications.append(application)

            return {"applications": applications}

        except Exception:
            return {"message": "Can't return"}

    def create_application(
        self, application: ApplicationRequest
    ) -> ApplicationsOut:
        # connect the database
        with pool.connection() as conn:
            # get cursor
            with conn.cursor() as db:
                # run our insert statement
                result = db.execute(
                    """
                    INSERT INTO applications
                        (
                            tournament_id,
                            user_id,
                            status
                                        )
                    VALUES
                        (%s, %s, %s)
                    RETURNING id;
                    """,
                    [
                        application.tournament_id,
                        application.user_id,
                        application.status,
                    ],
                )
                id = result.fetchone()[0]
                old_data = application.dict()
                return ApplicationResponse(id=id, **old_data)

    def get_application_by_id(self, app_id) -> Optional[ApplicationResponse]:
        try:
            # connect the database
            with pool.connection() as conn:
                # get cursor
                with conn.cursor() as db:
                    # run our insert statement
                    db.execute(
                        """
                        SELECT

                        id, tournament_id, user_id, status

                        FROM applications
                        WHERE id = %s
                        """,
                        (app_id,),
                    )
                    # for record in db:
                    #     print(record)
                    record = db.fetchone()

            # Create a list of ApplicationResponse objects
            if record:
                application = ApplicationResponse(
                    id=record[0],
                    tournament_id=record[1],
                    user_id=record[2],
                    status=record[3],
                )
                return application
            else:
                return None

        except Exception:
            return {"message": "Can't return application selected"}

    def update_application(
        self, app_id: int, application: ApplicationRequest
    ) -> ApplicationResponse:
        try:
            # connect the database
            with pool.connection() as conn:
                # get cursor
                with conn.cursor() as db:
                    # run our insert statement
                    db.execute(
                        """
                        UPDATE applications
                        SET
                                tournament_id = %s,
                                user_id= %s,
                                status= %s
                        WHERE id=%s
                        RETURNING id, tournament_id, user_id, status;
                        """,
                        [
                            application.tournament_id,
                            application.user_id,
                            application.status,
                            app_id,
                        ],
                    )
                    updated_record = db.fetchone()
                if updated_record:
                    return ApplicationResponse(
                        id=updated_record[0],
                        tournament_id=updated_record[1],
                        user_id=updated_record[2],
                        status=updated_record[3],
                    )
                else:
                    raise ValueError(
                        "Application not found or no update was made"
                    )
        except Exception as e:
            raise Exception(f"Database error: {e}")

    def delete_application(self, id: int) -> bool:
        try:
            # Connect to the database
            with pool.connection() as conn:
                # Get cursor
                with conn.cursor() as db:
                    db.execute(
                        """
                        DELETE FROM applications
                        WHERE id = %s
                        RETURNING id;
                        """,
                        [id],
                    )
                    # Commit the transaction
                    deleted_record = db.fetchone()
                    return bool(deleted_record)
        except Exception as e:
            raise Exception(f"Database error: {e}")
