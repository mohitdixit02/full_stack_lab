-- HASH JOIN - works for equality conditions
-- Index Scan (Join on PKey)
EXPLAIN ANALYZE
SELECT
    *
FROM 
    employee e
JOIN employee m ON e.manager_id = m.employee_id;


-- Non equality condition
-- Nested Loop Join (Join on non-equality condition)
EXPLAIN ANALYZE
SELECT
    *
FROM
    employee e
JOIN employee m ON e.manager_id > m.employee_id;


-- MERGE JOIN - works well if both tables sorted
-- Index Scan (Join on PKey)
EXPLAIN ANALYZE
SELECT
    *
FROM
    orders
JOIN
    orders o on orders.order_id = o.order_id;




-- **************** Vacuum Command ****************
-- VERBOSE option provides detailed information about the vacuuming process,
--  including the number of dead tuples removed and the number of live tuples remaining.
-- Vacuum Command
VACUUM VERBOSE orders;

-- VACUUM FULL
VACUUM VERBOSE FULL orders;
-- INFO:  "public.orders": found 0 removable, 100001 nonremovable row versions in 1129 pages



-- ******************* Visibility Map *******************
-- Check if pg_visibility extension is available and create it if not
SELECT * FROM pg_available_extensions WHERE name = 'pg_visibility';
CREATE EXTENSION pg_visibility;

-- Check visibility map for the orders table
SELECT * FROM pg_visibility_map_summary('orders'::regclass);
