-- Using Tables from Normalization Section
-- game_player
-- player
-- skill_level
-- skill_ability

-- Players with 0 inventory
INSERT INTO player (player_id, player_name, player_rating)
VALUES (7, 'Player 7', 'A'),
	   (8, 'Player 8', 'A');

-- New Skill Levels and Abilities - no mapping to player_rating
INSERT INTO skill_ability (player_skill_level, ability)
VALUES ('Expert', 'JUMP'),
	   ('Expert', 'RUN'),
	   ('Expert', 'SWIM'),
	   ('Expert', 'SHOOT');


-- INNER JOIN (JOIN)
SELECT
	p.player_name AS player_name,
	gp.item_type AS item_type,
	gp.quantity AS quantity,
	sl.player_skill_level AS skill_level
FROM player p
JOIN game_player gp ON p.player_id = gp.player_id
JOIN skill_level sl ON p.player_rating = sl.player_rating;

-- LEFT JOIN
SELECT
	p.player_name AS player_name,
	gp.item_type AS item_type,
	gp.quantity AS quantity,
	sl.player_skill_level AS skill_level
FROM player p
LEFT JOIN game_player gp ON p.player_id = gp.player_id
LEFT JOIN skill_level sl ON p.player_rating = sl.player_rating;

-- RIGHT JOIN
SELECT
	p.player_name AS player_name,
	sl.player_rating AS player_rating,
	sa.player_skill_level AS skill_level,
	sa.ability AS ability
FROM player p
RIGHT JOIN skill_level sl ON p.player_rating = sl.player_rating
RIGHT JOIN skill_ability sa ON sl.player_skill_level = sa.player_skill_level;

-- Self Join - Employee and Manager Relationship
SELECT
    CONCAT(ce.employee_first_name, ' ', ce.employee_last_name) AS employee_name,
	(CASE 
		WHEN me.employee_id IS NULL THEN 'No Manager' 
		ELSE CONCAT(me.employee_first_name, ' ', me.employee_last_name) 
	END) AS manager_name
FROM
	employee ce
LEFT JOIN
	employee me
	ON ce.manager_id = me.employee_id AND ce.manager_company_id = me.company_id;

-- Natural Join
SELECT
	*
FROM
	skill_level
NATURAL JOIN skill_ability; -- player_skill_level appear one time

-- INNER JOIN (USING)
SELECT
	*
FROM
	skill_level
JOIN skill_ability USING (player_skill_level); -- player_skill_level appear one time

-- INNER JOIN (WITHOUT USING)
SELECT
	*
FROM
	skill_level sl
JOIN skill_ability sa on sl.player_skill_level = sa.player_skill_level; -- player_skill_level appear two times

-- CROSS JOIN - Cartesian Product (All combinations of rows from both tables)
SELECT -- total 48 rows (8 x 6)
	*
FROM player -- 8 rows
CROSS JOIN skill_level; -- 6 rows

-- UPDATE WITH JOIN
SELECT
	p.player_name AS player_name,
	sl.player_rating AS player_rating,
	sa.player_skill_level AS skill_level,
	sa.ability AS ability
FROM player p
JOIN skill_level sl ON p.player_rating = sl.player_rating
JOIN skill_ability sa ON sl.player_skill_level = sa.player_skill_level
WHERE sa.ability = 'SWIM';

-- *************
UPDATE player as p
SET player_name = CONCAT(player_name, ' - Swimmer')
FROM skill_level sl
JOIN skill_ability sa ON sl.player_skill_level = sa.player_skill_level
WHERE p.player_rating = sl.player_rating
AND sa.ability = 'SWIM';

-- DELETE WITH JOIN (Possible in Postgres using USING or in MySQL using JOIN)
DELETE FROM player
USING skill_level sl, skill_ability sa
WHERE player.player_rating = sl.player_rating
AND sl.player_skill_level = sa.player_skill_level
AND sa.ability = 'SWIM';

-- Restoring deleted players
INSERT INTO player (player_id, player_name, player_rating)
VALUES (3, 'Charlie', 'C'),
	   (4, 'Dave', 'D'),
	   (5, 'Eve', 'E'),
	   (6, 'Frank', 'F');
