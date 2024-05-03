steps = [
    [
        # "Up" SQL statement
        """
        CREATE TABLE venues (
            id SERIAL PRIMARY KEY NOT NULL,
            user_id INT NOT NULL DEFAULT 0,
            venue_name VARCHAR(100) NOT NULL,
            state VARCHAR(100) NOT NULL,
            address VARCHAR(100) NOT NULL,
            photo_url VARCHAR(256) NOT NULL,
            capacity INT NOT NULL,
            special_accommodations VARCHAR(256) NOT NULL,
            venue_cost INT NOT NULL,
            FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE venues;
        """,
    ],
]
