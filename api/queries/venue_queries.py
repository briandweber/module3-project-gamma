"""
Database Queries for Venues
"""

import os
from models.venues import VenueResponse, VenueRequest
from utils.exceptions import UserDatabaseException
from psycopg_pool import ConnectionPool
from typing import List, Optional

DATABASE_URL = os.environ.get("DATABASE_URL")
if not DATABASE_URL:
    raise ValueError("DATABASE_URL environment variable is not set")

pool = ConnectionPool(DATABASE_URL)


class VenueRepository:
    def get_all(self) -> List[VenueResponse]:
        try:
            # connect the database
            with pool.connection() as conn:
                # get cursor
                with conn.cursor() as db:
                    # run our insert statement
                    db.execute(
                        """
                        SELECT

                        id, user_id, venue_name, state , address,
                        photo_url, capacity, special_accommodations, venue_cost

                        FROM venues
                        ORDER BY state
                        """
                    )
                    records = db.fetchall()

            venues = []
            for record in records:
                venue = VenueResponse(
                    id=record[0],
                    user_id=record[1],
                    venue_name=record[2],
                    state=record[3],
                    address=record[4],
                    photo_url=record[5],
                    capacity=record[6],
                    special_accommodations=record[7],
                    venue_cost=record[8],
                )
                venues.append(venue)

            return venues

        except Exception:
            return {"message": "Can't return"}

    # --------------------------------------------------------------------
    def create(
        self, venue: VenueRequest
    ) -> List[VenueResponse]:
        # connect the database
        with pool.connection() as conn:
            # get cursor
            with conn.cursor() as db:
                # run our insert statement
                result = db.execute(
                    """
                    INSERT INTO venues
                        (
                            user_id,
                            venue_name,
                            state,
                            address,
                            photo_url,
                            capacity,
                            special_accommodations,
                            venue_cost
                                        )
                    VALUES
                        (%s, %s, %s, %s, %s, %s, %s, %s)
                    RETURNING id;
                    """,
                    [
                        venue.user_id,
                        venue.venue_name,
                        venue.state,
                        venue.address,
                        venue.photo_url,
                        venue.capacity,
                        venue.special_accommodations,
                        venue.venue_cost,
                    ],
                )
                id = result.fetchone()[0]
                old_data = venue.dict()
                return VenueResponse(id=id, **old_data)

    # --------------------------------------------------------------------

    def get_by_id(self, item_id: int) -> Optional[VenueResponse]:
        try:
            # Connect to the database
            with pool.connection() as conn:
                # Get cursor
                with conn.cursor() as db:
                    db.execute(
                        """
                        SELECT
                        id, user_id, venue_name,
                        state, address,
                        photo_url, capacity,
                        special_accommodations, venue_cost
                        FROM venues
                        WHERE id = %s
                        """,
                        (item_id,),
                    )
                    record = db.fetchone()

            if record:
                venue = VenueResponse(
                    id=record[0],
                    user_id=record[1],
                    venue_name=record[2],
                    state=record[3],
                    address=record[4],
                    photo_url=record[5],
                    capacity=record[6],
                    special_accommodations=record[7],
                    venue_cost=record[8],
                )
                return venue
            else:
                return None  # venue not found

        except Exception:
            raise UserDatabaseException("Error fetching venue data")

    # --------------------------------------------------------------------

    def get_venues_by_user(
        self, user_id: int
    ) -> List[VenueResponse]:
        try:
            # Connect to the database
            with pool.connection() as conn:
                # Get cursor
                with conn.cursor() as db:
                    db.execute(
                        """
                        SELECT
                        id, user_id, venue_name,
                        state, address,
                        photo_url, capacity,
                        special_accommodations, venue_cost
                        FROM venues
                        WHERE user_id = %s
                        """,
                        (user_id,),
                    )
                    records = db.fetchall()

            venues = []
            for record in records:
                venue = VenueResponse(
                    id=record[0],
                    user_id=record[1],
                    venue_name=record[2],
                    state=record[3],
                    address=record[4],
                    photo_url=record[5],
                    capacity=record[6],
                    special_accommodations=record[7],
                    venue_cost=record[8],
                )
                venues.append(venue)

            return venues

        except Exception:
            raise UserDatabaseException("Error fetching venue data")

    # --------------------------------------------------------------------
    def delete_by_id(self, item_id: int) -> bool:
        try:
            # Connect to the database
            with pool.connection() as conn:
                # Get cursor
                with conn.cursor() as db:
                    db.execute(
                        """
                        DELETE FROM venues
                        WHERE id = %s
                        """,
                        (item_id,),
                    )
                    # Commit the transaction
                    conn.commit()
            return True
        except Exception:
            return False

    # --------------------------------------------------------------------
    def save(self, venue: VenueResponse) -> bool:
        try:
            # Connect to the database
            with pool.connection() as conn:
                # Get cursor
                with conn.cursor() as db:
                    db.execute(
                        """
                        UPDATE venues
                        SET
                            venue_name = %s,
                            state = %s,
                            address = %s,
                            photo_url = %s,
                            capacity = %s,
                            special_accommodations = %s,
                            venue_cost = %s
                        WHERE id = %s
                        """,
                        (
                            venue.venue_name,
                            venue.state,
                            venue.address,
                            venue.photo_url,
                            venue.capacity,
                            venue.special_accommodations,
                            venue.venue_cost,
                            venue.id,
                        ),
                    )
                    # Commit the transaction
                    conn.commit()
            return True
        except Exception:
            return False


# --------------------------------------------------------------------
