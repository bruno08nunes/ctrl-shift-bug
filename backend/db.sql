CREATE DATABASE game;
USE game;

CREATE TABLE players (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT current_timestamp
);

CREATE TABLE rounds (
    id INT AUTO_INCREMENT PRIMARY KEY,
    player_id INT NOT NULL,
    weeks INT NOT NULL,
    created_at TIMESTAMP DEFAULT current_timestamp,
    FOREIGN KEY (player_id) REFERENCES players(id)
);