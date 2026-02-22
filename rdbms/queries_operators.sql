-- Using Tables from Normalization Section
-- game_player
-- player
-- skill_level
-- skill_ability

-- Group By + Having + SQL Query Execution Order
SELECT -- RUNS after HAVING, GROUP BY, WHERE, JOINS, and FROM
	p.player_name AS "Player Name",
	p.player_rating AS "Player Rating",
	COUNT(item_type) AS "Inverntory COUNT"
FROM player p
LEFT JOIN game_player gp ON gp.player_id = p.player_id -- JOINS + FROM execute first
WHERE p.player_rating IN ('A','B', 'C', 'D') -- WHERE executes after FROM and JOINS, no ALIAS allowed in WHERE clause
GROUP BY "Player Name", "Player Rating" -- GROUP BY executes after WHERE, ALIAS allowed in GROUP BY clause
HAVING (COUNT(item_type) > 0) -- HAVING executes after GROUP BY, ALIAS depends on RDBS, Postgres don't allow it
ORDER BY "Player Name" -- Execute after SELECT, ALIAS allowed in ORDER BY clause
LIMIT 3 -- Execute after ORDER BY
OFFSET 1; -- Execute before LIMIT, after ORDER BY




-- Transactions
BEGIN; 

INSERT INTO player(player_name, player_rating) VALUES ('Player 1', 'A');
INSERT INTO player(player_name, player_rating) VALUES ('Player 2', 'B');

SELECT * FROM player;

ROLLBACK; -- Have to run manually or use PL/pgSQL block to automatically rollback on errors
-- Above transaction will fail, so need to ROLLBACK to undo the changes made by the transaction

-- Commit the transaction if all operations are successful
-- SOME RDBMS will automatically commit if there are no errors, even if COMMIT is not explicitly called
COMMIT; 



-- Savepoints
BEGIN;
SAVEPOINT savepoint1; -- Create a savepoint before the first insert
INSERT INTO player(player_id, player_name, player_rating) VALUES (9, 'Player 9', 'A');
COMMIT;

SELECT COUNT(*) FROM player; -- count incremented by 1

ROLLBACK TO savepoint1; -- Rollback to the savepoint, undoing the second insert but keeping the first insert



-- ************** Some Complex Operators **************
-- BETWEEN
SELECT player_name, player_rating
FROM player
WHERE player_rating BETWEEN 'B' AND 'D'; -- INCLUDES B and D, works with numbers and dates too

-- UNION
SELECT ability from skill_ability WHERE player_skill_level = 'Beginner'
UNION
SELECT ability from skill_ability WHERE player_skill_level = 'Intermediate'; -- UNION removes duplicates

-- UNION ALL
SELECT ability from skill_ability WHERE player_skill_level = 'Beginner'
UNION ALL
SELECT ability from skill_ability WHERE player_skill_level = 'Intermediate'; -- UNION ALL keeps duplicates

-- EXCEPT
SELECT ability from skill_ability WHERE player_skill_level = 'Expert'
EXCEPT
SELECT ability from skill_ability WHERE player_skill_level = 'Beginner'; -- EXCEPT returns rows from the first query that are not in the second query

-- ALL
-- Compares the value to all values returned by the subquery, returns true if the condition is true for all values - AND condition
SELECT player_name, player_rating
FROM player
WHERE player_rating > ALL (
	SELECT player_rating FROM skill_level WHERE player_skill_level = 'Beginner'
); -- All ratings must be grater than A and B

-- ANY
-- Compares the value to any value returned by the subquery, returns true if the condition is true for at least one value - OR condition
SELECT player_name, player_rating
FROM player
WHERE player_rating > ANY (
    SELECT player_rating FROM skill_level WHERE player_skill_level = 'Beginner'
); -- All ratings must be greater than A or B

-- INTERSECT
SELECT ability from skill_ability WHERE player_skill_level = 'Beginner'
INTERSECT
SELECT ability from skill_ability WHERE player_skill_level = 'Intermediate'; -- INTERSECT returns rows that are in both queries

-- EXISTS
SELECT player_name, player_rating
FROM player p
WHERE EXISTS (
    SELECT 1 FROM game_player gp
	WHERE gp.player_id = p.player_id AND gp.quantity > 1
); -- EXISTS returns true if the subquery returns any rows, false if it returns no rows

SELECT 1 FROM player; -- It returns the value 1 for each row in the subquery instead of data
