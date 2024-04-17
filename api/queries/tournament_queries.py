"""
Database Queries for Tournaments
"""
import os
from utils.exceptions import UserDatabaseException
from psycopg_pool import ConnectionPool
from typing import List, Optional
from models.tournaments import TournamentResponse, TournamentRequest

DATABASE_URL = os.environ.get("DATABASE_URL")
if not DATABASE_URL:
    raise ValueError("DATABASE_URL environment variable is not set")

pool = ConnectionPool(DATABASE_URL)


class TournamentRepository:
    def get_all(self) -> List[TournamentResponse]:
        try:
            # connect the database
            with pool.connection() as conn:
                # get cursor
                with conn.cursor() as db:
                    # run our insert statement
                    db.execute(
                        """
                        SELECT

                        id, event_name, roster_size , event_start,
                        duration, event_description, picture_url, entry_fee,
                        prize, sponsors

                        FROM tournaments
                        ORDER BY event_name
                        """
                    )
                    records = db.fetchall()

            tournaments = []
            for record in records:
                tournament = TournamentResponse(
                    id=record[0],
                    event_name=record[1],
                    roster_size=record[2],
                    event_start=record[3],
                    duration=record[4],
                    event_description=record[5],
                    picture_url=record[6],
                    entry_fee=record[7],
                    prize=record[8],
                    sponsors=record[9],
                )
                tournaments.append(tournament)

            return tournaments

        except Exception:
            return {"message": "Can't return"}

# --------------------------------------------------------------------
    def create(self, tournament: TournamentRequest) -> List[
        TournamentResponse
    ]:
        # connect the database
        with pool.connection() as conn:
            # get cursor
            with conn.cursor() as db:
                # run our insert statement
                result = db.execute(
                    """
                    INSERT INTO tournaments
                        (
                            event_name,
                            roster_size,
                            event_start,
                            duration,
                            event_description,
                            picture_url,
                            entry_fee,
                            prize,
                            sponsors
                                        )
                    VALUES
                        (%s, %s, %s, %s, %s, %s, %s, %s, %s)
                    RETURNING id;
                    """,
                    [
                        tournament.event_name,
                        tournament.roster_size,
                        tournament.event_start,
                        tournament.duration,
                        tournament.event_description,
                        tournament.picture_url,
                        tournament.entry_fee,
                        tournament.prize,
                        tournament.sponsors
                            ]
                )
                id = result.fetchone()[0]
                old_data = tournament.dict()
                return TournamentResponse(id=id, **old_data)

    # --------------------------------------------------------------------
    def get_by_id(self, item_id: int) -> Optional[TournamentResponse]:
        try:
            # Connect to the database
            with pool.connection() as conn:
                # Get cursor
                with conn.cursor() as db:
                    db.execute(
                        """
                        SELECT id, event_name, roster_size, event_start,
                        duration, event_description, picture_url, entry_fee,
                        prize, sponsors
                        FROM tournaments
                        WHERE id = %s
                        """,
                        (item_id,),
                    )
                    record = db.fetchone()

            if record:
                tournament = TournamentResponse(
                    id=record[0],
                    event_name=record[1],
                    roster_size=record[2],
                    event_start=record[3],
                    duration=record[4],
                    event_description=record[5],
                    picture_url=record[6],
                    entry_fee=record[7],
                    prize=record[8],
                    sponsors=record[9],
                )
                return tournament
            else:
                return None  # Tournament not found

        except Exception:
            raise UserDatabaseException("Error fetching tournament data")

    # --------------------------------------------------------------------
    def delete_by_id(self, item_id: int) -> bool:
        try:
            # Connect to the database
            with pool.connection() as conn:
                # Get cursor
                with conn.cursor() as db:
                    db.execute(
                        """
                        DELETE FROM tournaments
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
    def save(self, tournament: TournamentResponse) -> bool:
        try:
            # Connect to the database
            with pool.connection() as conn:
                # Get cursor
                with conn.cursor() as db:
                    db.execute(
                        """
                        UPDATE tournaments
                        SET
                            event_name = %s,
                            roster_size = %s,
                            event_start = %s,
                            duration = %s,
                            event_description = %s,
                            picture_url = %s,
                            entry_fee = %s,
                            prize = %s,
                            sponsors = %s
                        WHERE id = %s
                        """,
                        (
                            tournament.event_name,
                            tournament.roster_size,
                            tournament.event_start,
                            tournament.duration,
                            tournament.event_description,
                            tournament.picture_url,
                            tournament.entry_fee,
                            tournament.prize,
                            tournament.sponsors,
                            tournament.id,
                        ),
                    )
                    # Commit the transaction
                    conn.commit()
            return True
        except Exception:
            return False

# --------------------------------------------------------------------