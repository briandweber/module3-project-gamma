steps = [
    [
        # "Up" SQL statement
        """
        CREATE TABLE users (
            id SERIAL PRIMARY KEY NOT NULL,
            username VARCHAR(100) NOT NULL UNIQUE,
            password VARCHAR(256) NOT NULL,
            user_type VARCHAR(100) NOT NULL,
            first_name VARCHAR(100) NOT NULL,
            last_name VARCHAR(100) NOT NULL,
            photo_url VARCHAR(256) NOT NULL,
            phone_number VARCHAR(100) NOT NULL,
            address VARCHAR(100) NOT NULL,
            CHECK (LENGTH(username) >= 1),
            CHECK (LENGTH(password) >= 1)
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE users;
        """,
    ],
]
