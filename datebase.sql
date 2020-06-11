CREATE DATABASE babam_db;

CREATE TABLE songs(
    song_id SERIAL PRIMARY KEY,
    name VARCHAR (50),
    artist VARCHAR (50),
    album VARCHAR (50),
    type VARCHAR (50),
)