-- Player Rating
ALTER TABLE game_player
ADD COLUMN player_rating VARCHAR; -- New column for player rating

TRUNCATE TABLE game_player; -- Clear existing data
INSERT INTO game_player (player_id, player_name, item_type, quantity, player_rating)
VALUES
(1, 'Alice', 'Sword', 1, 'A'),
(1, 'Alice', 'Shield', 1, 'A'),
(1, 'Alice', 'Potion', 5, 'A'),
(2, 'Bob', 'Bow', 1, 'B'),
(2, 'Bob', 'Arrow', 20, 'B'),
(3, 'Charlie', 'Staff', 1, 'C'),
(3, 'Charlie', 'Robe', 1, 'C'),
(3, 'Charlie', 'Ring', 2, 'C');

-- 2NF Violation because player_rating depends on player_id, not on the entire composite key (player_id, item_type).
-- Update Anomaly: If we update player_rating for a player, we have to update it for all rows of that player
UPDATE game_player
SET player_rating = 'D'
WHERE player_id = 1;

select * from game_player;

-- ************ 2NF Implementation ************
DROP TABLE IF EXISTS game_player; -- DROP TABLE IF EXISTS
CREATE TABLE game_player (
    player_id INT,
    item_type VARCHAR,
    quantity INT,
    PRIMARY KEY (player_id, item_type) -- Composite primary key to ensure uniqueness of player and item combination
);

CREATE TABLE player (
    player_id INT PRIMARY KEY,
    player_name VARCHAR NOT NULL,
    player_rating VARCHAR
);

INSERT INTO player (player_id, player_name, player_rating)
VALUES
(1, 'Alice', 'A'),
(2, 'Bob', 'B'),
(3, 'Charlie', 'C');

INSERT INTO game_player (player_id, item_type, quantity)
VALUES
(1, 'Sword', 1),
(1, 'Shield', 1),
(1, 'Potion', 5),
(2, 'Bow', 1),
(2, 'Arrow', 20),
(3, 'Staff', 1),
(3, 'Robe', 1),
(3, 'Ring', 2);
-- Only need to update player_rating once in the player table

-- DQL
select
    p.player_id,
    p.player_name,
    p.player_rating,
    gp.item_type,
    gp.quantity
from
    game_player gp
    JOIN player p ON gp.player_id = p.player_id;