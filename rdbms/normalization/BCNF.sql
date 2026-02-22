-- Player Skills
-- A,B -> Beginner
-- C,D -> Intermediate
-- E,F -> Advanced

DROP TABLE IF EXISTS game_player; -- DROP TABLE IF EXISTS
DROP TABLE IF EXISTS player;
CREATE TABLE game_player (
    player_id INT,
    item_type VARCHAR,
    quantity INT,
    PRIMARY KEY (player_id, item_type) -- Composite primary key
);

CREATE TABLE player (
    player_id INT PRIMARY KEY,
    player_name VARCHAR NOT NULL,
    player_rating VARCHAR,
    player_skill_level VARCHAR
);

INSERT INTO player (player_id, player_name, player_rating, player_skill_level)
VALUES
(1, 'Alice', 'A', 'Beginner'),
(2, 'Bob', 'B', 'Beginner'),
(3, 'Charlie', 'C', 'Intermediate'),
(4, 'Dave', 'D', 'Intermediate'),
(5, 'Eve', 'E', 'Advanced'),
(6, 'Frank', 'F', 'Advanced');

INSERT INTO game_player (player_id, item_type, quantity)
VALUES
(1, 'Sword', 1),
(1, 'Shield', 1),
(1, 'Potion', 5),
(2, 'Bow', 1),
(2, 'Arrow', 20),
(3, 'Staff', 1),
(3, 'Robe', 1),
(3, 'Ring', 2),
(4, 'Dagger', 1),
(4, 'Cloak', 1),
(5, 'Axe', 1),
(5, 'Helmet', 1),
(6, 'Spear', 1),
(6, 'Armor', 1);

-- Update Anomaly, if any player level up, we have to update both rating and skill level, 
-- which if partially done, it can lead to data inconsistency.
UPDATE player
SET player_rating = 'B' -- skill update missed
WHERE player_id = 1;

-- BCNF Normalization
-- Removing the Transitive Dependency of skill level on player rating by creating a separate table for skill levels.
DROP TABLE IF EXISTS skill_level; -- DROP TABLE IF EXISTS
CREATE TABLE skill_level (
    player_rating VARCHAR PRIMARY KEY,
    player_skill_level VARCHAR
);
ALTER TABLE player
DROP COLUMN player_skill_level; -- Removing the transitive dependency from player table

INSERT INTO skill_level (player_rating, player_skill_level)
VALUES
('A', 'Beginner'),
('B', 'Beginner'),
('C', 'Intermediate'),
('D', 'Intermediate'),
('E', 'Advanced'),
('F', 'Advanced');

-- DQL
SELECT
    p.player_id,
    p.player_name,
    p.player_rating,
    s.player_skill_level,
    gp.item_type,
    gp.quantity
FROM player p
JOIN skill_level s ON p.player_rating = s.player_rating
JOIN game_player gp ON p.player_id = gp.player_id;
