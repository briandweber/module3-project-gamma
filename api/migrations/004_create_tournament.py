steps = [
    [
        # "Up" SQL statement
        """
        CREATE TABLE tournaments (
            id SERIAL PRIMARY KEY NOT NULL,
            user_id INT NOT NULL DEFAULT 0,
            event_name VARCHAR(100) NOT NULL,
            roster_size SMALLINT NOT NULL,
            event_start DATE NOT NULL,
            duration INT NOT NULL,
            event_description VARCHAR(100) NOT NULL,
            picture_url VARCHAR(100) NOT NULL,
            entry_fee FLOAT NOT NULL,
            prize FLOAT NOT NULL,
            sponsors VARCHAR(100) NOT NULL,
            FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE tournaments;
        """,
    ],
]
