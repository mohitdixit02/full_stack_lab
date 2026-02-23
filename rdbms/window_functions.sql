-- Wildcard Characters
-- % - Matches any sequence of characters (including an empty sequence) - Case Sensitive

SELECT * FROM employee
WHERE employee_first_name LIKE 'J%'; -- Matches any first name that starts with 'J'

-- _ - Matches any single character
SELECT * FROM employee
WHERE employee_first_name LIKE 'J__n'; -- Matches any first name that starts with 'J', followed by any two characters, and ends with 'n'



-- ************** Window Functions **************
-- Partition By + Aggregate Functions
SELECT
	sl.player_skill_level,
	p.player_name,
	gp.item_type,
	(CASE
	 WHEN quantity = MAX(quantity) OVER (PARTITION BY sl.player_skill_level)
	 THEN TRUE ELSE FALSE 
	END) AS is_max_quantity_per_skill
FROM game_player gp
JOIN player p ON p.player_id = gp.player_id
JOIN skill_level sl on sl.player_rating = p.player_rating;


-- Partition By + Rank
SELECT
	sl.player_skill_level,
	p.player_name,
	gp.item_type,
	gp.quantity,
	RANK() OVER (PARTITION BY sl.player_skill_level ORDER BY quantity DESC) AS quantity_rank_per_skill
FROM game_player gp
JOIN player p ON p.player_id = gp.player_id
JOIN skill_level sl on sl.player_rating = p.player_rating;

-- Partition By + Dense_Rank
SELECT
	sl.player_skill_level,
	p.player_name,
	gp.item_type,
	gp.quantity,
	DENSE_RANK() OVER (PARTITION BY sl.player_skill_level ORDER BY quantity DESC) AS quantity_rank_per_skill
FROM game_player gp
JOIN player p ON p.player_id = gp.player_id
JOIN skill_level sl on sl.player_rating = p.player_rating;

-- Partition By + Row_Number
SELECT
	sl.player_skill_level,
	p.player_name,
	gp.item_type,
	gp.quantity,
	ROW_NUMBER() OVER (PARTITION BY sl.player_skill_level ORDER BY quantity DESC) AS quantity_rank_per_skill
FROM game_player gp
JOIN player p ON p.player_id = gp.player_id
JOIN skill_level sl on sl.player_rating = p.player_rating;

-- Partition By + Lag/Lead
SELECT
    sl.player_skill_level,
    p.player_name,
    gp.item_type,
    gp.quantity,
    LAG(quantity) OVER (PARTITION BY sl.player_skill_level ORDER BY quantity DESC) AS previous_quantity_per_skill,
    LEAD(quantity) OVER (PARTITION BY sl.player_skill_level ORDER BY quantity DESC) AS next_quantity_per_skill,
    (CASE
     WHEN quantity > LAG(quantity) OVER (PARTITION BY sl.player_skill_level ORDER BY quantity DESC)
     THEN 'Increased' 
     WHEN quantity < LAG(quantity) OVER (PARTITION BY sl.player_skill_level ORDER BY quantity DESC)
     THEN 'Decreased' 
     ELSE 'Same' 
    END) AS quantity_trend_per_skill
FROM game_player gp
JOIN player p ON p.player_id = gp.player_id
JOIN skill_level sl on sl.player_rating = p.player_rating;
