-- Temp Table Implementation
CREATE TEMPORARY TABLE temp_clone_null (
    id INT PRIMARY KEY,
    data VARCHAR(255)
);

-- Insert sample data into the temporary table
INSERT INTO temp_clone_null (id, data) VALUES (1, 'Sample Data 1');
INSERT INTO temp_clone_null (id, data) VALUES (2, 'Sample Data 2');

-- Query the temporary table to verify data insertion
SELECT * FROM temp_clone_null;

-- DROP Table (Optional, as temporary tables are automatically dropped at the end of the session)
-- On closing the query tool on PGAdmin, the temporary table will be automatically dropped.
DROP TABLE temp_clone_null;



-- SQL Table Clone Implementation
CREATE TABLE clone_null AS TABLE employee WITH NO DATA; -- Clone only structure, no data
CREATE TABLE clone_null_with_data AS TABLE employee; -- Clone structure and data, but no metadata (constraints, indexes, etc.)
CREATE TABLE clone_null_with_meta (LIKE employee INCLUDING ALL); -- Clone structure and metadata (constraints, indexes, etc.) but no data

-- Clone Structure, Metadata and Later Insert Data
CREATE TABLE clone_null_with_meta_and_data (LIKE employee INCLUDING ALL);
INSERT INTO clone_null_with_meta_and_data SELECT * FROM employee; -- Insert data after cloning structure and metadata



-- NULL Value
SELECT
	*
FROM
	game_player
WHERE
	quantity > NULL;
-- The above query will not return any results because NULL is not a value that can be compared using standard comparison operators. 
-- Instead, IS NULL or IS NOT NULL should be check for NULL values.

SELECT
	*
FROM
	game_player
WHERE
	quantity IS NOT NULL;



