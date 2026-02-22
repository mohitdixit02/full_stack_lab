-- Table for Player and Items Inventory
DROP TABLE IF EXISTS game_player; -- DROP TABLE IF EXISTS
-- This table violates 1NF because each player can have multiple items, which leads to repeating groups of data.
CREATE TABLE game_player (
	player_id INT PRIMARY KEY,
	player_name VARCHAR NOT NULL,
	item_type_1 VARCHAR,
	quantity_1 INT,
    item_type_2 VARCHAR,
    quantity_2 INT,
    item_type_3 VARCHAR,
    quantity_3 INT
);

INSERT INTO game_player (player_id, player_name, item_type_1, quantity_1, item_type_2, quantity_2, item_type_3, quantity_3)
VALUES (1, 'Alice', 'Sword', 1, 'Shield', 1, 'Potion', 5),
       (2, 'Bob', 'Bow', 1, 'Arrow', 20, NULL, NULL),
       (3, 'Charlie', 'Staff', 1, 'Robe', 1, 'Ring', 2);


-- 1NF Implementation
DROP TABLE IF EXISTS game_player; -- DROP TABLE IF EXISTS
CREATE TABLE game_player (
    player_id INT,
    player_name VARCHAR NOT NULL,
    item_type VARCHAR,
    quantity INT,
    PRIMARY KEY (player_id, item_type) -- Composite primary key to ensure uniqueness of player and item combination
);

INSERT INTO game_player (player_id, player_name, item_type, quantity)
VALUES
(1, 'Alice', 'Sword', 1),
(1, 'Alice', 'Shield', 1),
(1, 'Alice', 'Potion', 5),
(2, 'Bob', 'Bow', 1),
(2, 'Bob', 'Arrow', 20),
(3, 'Charlie', 'Staff', 1),
(3, 'Charlie', 'Robe', 1),
(3, 'Charlie', 'Ring', 2);
