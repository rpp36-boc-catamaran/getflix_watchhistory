DROP DATABASE IF EXISTS boc_history;
CREATE DATABASE boc_history;

DROP TABLE IF EXISTS history;
CREATE TABLE history (
id serial PRIMARY KEY,
user_id int NOT NULL,
movie_id int NOT NULL
);