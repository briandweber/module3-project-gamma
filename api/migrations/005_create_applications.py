steps = [
    [
        # "Up" SQL statement
        """
        CREATE TABLE applications (
            id SERIAL PRIMARY KEY NOT NULL,
            tournament_id INT NOT NULL,
            user_id INT NOT NULL,
            status VARCHAR(20) NOT NULL DEFAULT 'pending', 
            FOREIGN KEY(tournament_id) REFERENCES tournaments(id),
            FOREIGN KEY(user_id) REFERENCES users(id)
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE applications;
        """,
    ],
]
