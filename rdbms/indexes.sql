-- Indexes Implementation

-- Creating a large table for testing indexes
DROP TABLE IF EXISTS orders; -- DROP TABLE IF EXISTS
CREATE TABLE orders (
    order_id SERIAL PRIMARY KEY,
    customer_id INT,
    order_date DATE,
    total_amount DECIMAL(10, 2)
);

-- Insert sample data into orders table
INSERT INTO orders (customer_id, order_date, total_amount)
SELECT (RANDOM() * 1000)::INT, -- Random customer_id between 0 and 1000
       CURRENT_DATE - (RANDOM() * 365)::INT, -- Random order_date within the last year
       (RANDOM() * 1000)::DECIMAL(10, 2) -- Random total_amount between 0 and 1000
FROM generate_series(1, 100000); -- Insert 100,000 rows

-- Fetching all indexes
SELECT 
    indexname, 
    indexdef
FROM
    pg_indexes
WHERE 
    tablename = 'orders';

-- Drop index
DROP INDEX IF EXISTS idx_customer_id;



-- Test without Index
EXPLAIN ANALYZE 
SELECT * FROM orders WHERE customer_id = 500; -- SeqScan - 0.137 ms

-- Hash Index - Equality
CREATE INDEX idx_customer_id ON orders USING HASH (customer_id); -- BITMAP Heap Scan

-- Test on Range Query with Hash Index
EXPLAIN ANALYZE
SELECT * FROM orders WHERE customer_id > 500; -- SeqScan (Hash Index not used for range queries)




-- Unique Index - Unique constraint on order_id
-- Not work on customer_id, because it is not unique
CREATE UNIQUE INDEX idx_order_id ON orders (order_id); -- Unique Index




-- Full Text Index - on order_date for text search
ALTER TABLE orders ADD COLUMN order_date_tsv tsvector;
UPDATE orders SET order_date_tsv = to_tsvector(order_date::text);
CREATE INDEX idx_order_date_tsv ON orders USING GIN (order_date_tsv);
-- GIN - Generalized Inverted Index, used for full-text search and array data types

-- Test Full Text Index
EXPLAIN ANALYZE
SELECT * FROM orders WHERE to_tsvector(order_date::text) @@ to_tsquery('2025');
-- Without Index - 154.7 ms - Parallel SeqScan - use of multiple CPU cores to scan the table

SET enable_seqscan = off;
EXPLAIN ANALYZE
SELECT * FROM orders WHERE to_tsvector(order_date::text) @@ to_tsquery('-31');
-- SeqScan after manual disable




-- Partial Index - on total_amount for values greater than 500
CREATE INDEX idx_total_amount_partial ON orders (total_amount) WHERE total_amount > 500; -- Partial Index

-- Without Partial Index
EXPLAIN ANALYZE
SELECT * FROM orders WHERE total_amount > 500; -- SeqScan

-- With Partial Index 
-- Bitmap Heap Scan



-- Reverse Index
CREATE INDEX idx_order_date_desc ON orders (order_date DESC); -- Reverse Index

-- Test Reverse Index
EXPLAIN ANALYZE
SELECT * FROM orders ORDER BY order_date DESC LIMIT 10;
-- WITHOUT INDEX - SeqScan with Sort
-- WITH REVERSE INDEX - Index Scan




-- Index Only Scan
CREATE INDEX idx_total_amount ON orders (total_amount); -- B-Tree Index

-- WITHOUT INDEX - SeqScan
-- Test Index Only Scan
EXPLAIN ANALYZE
SELECT total_amount FROM orders WHERE total_amount > 500; -- Index Only Scan

EXPLAIN ANALYZE
SELECT * FROM orders WHERE total_amount > 500; -- Bitmap Heap Scan (not index only because it needs to fetch the whole row)



-- Postgres indexes are non-clustered by default
-- Making a clustered index on customer_id
CREATE INDEX idx_customer_id ON orders (customer_id); -- B-Tree Index
CLUSTER orders USING idx_customer_id; -- Clustered Index

-- Test Clustered Index
SELECT * FROM orders; -- Actual Data is physically ordered by customer_id

