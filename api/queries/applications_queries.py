"""
Database Queries for Applications
"""
import os
from psycopg_pool import ConnectionPool
from typing import List
from models.applications import ApplicationRequest, ApplicationResponse

DATABASE_URL = os.environ.get("DATABASE_URL")
if not DATABASE_URL:
    raise ValueError("DATABASE_URL environment variable is not set")

pool = ConnectionPool(DATABASE_URL)


class ApplicationRepository:
    def get_all_applications(self) -> List[ApplicationResponse]:
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

            return applications

        except Exception:
            return {"message": "Can't return"}

    def create_application(self, application: ApplicationRequest) -> List[
        ApplicationResponse
    ]:
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
                        application.status
                            ]
                )
                id = result.fetchone()[0]
                old_data = application.dict()
                return ApplicationResponse(id=id, **old_data)
