-- ************** Table Locks **************

-- Access Exclusive Lock
-- Transaction 1
BEGIN;
LOCK TABLE orders IN ACCESS EXCLUSIVE MODE; -- Transaction 1 will acquire an Access Exclusive lock on the orders table, blocking all other transactions from accessing the table

-- Transaction 2
BEGIN;
SELECT * FROM orders; -- Transaction 2 will wait till Transaction 1 commits or rollbacks



-- Access Share Lock
-- Transaction 1
BEGIN;
LOCK TABLE orders IN ACCESS SHARE MODE; -- Transaction 1 will acquire an Access Share lock, Read allowed but no writes

-- Transaction 2.1 (SELECT)
BEGIN;
SELECT * FROM orders; -- Transaction 2 will run as SELECT not blocked

-- Transaction 2.2 (INSERT)
BEGIN;
INSERT INTO orders (order_id, customer_id) VALUES (1, 123); -- Will work as it is Row exclusive lock

-- Transaction 2.3 (ALTER TABLE)
BEGIN;
ALTER TABLE orders ADD COLUMN order_date DATE; -- Transaction 2 will wait till Transaction 1 commits or rollbacks



-- Exclusive Lock
-- Transaction 1
BEGIN;
LOCK TABLE orders IN EXCLUSIVE MODE; -- Transaction 1 will acquire an Exclusive lock, reads allowed but no writes

-- Transaction 2.1 (SELECT)
BEGIN;
SELECT * FROM orders; -- Transaction 2 will run as SELECT not blocked

-- Transaction 2.2 (INSERT)
BEGIN;
INSERT INTO orders (order_id, customer_id) VALUES (1, 123); -- Transaction 2 will wait till Transaction 1 commits or rollbacks - DMLs are blocked



-- ROW SHARE Lock
-- Transaction 1
BEGIN;
LOCK TABLE orders IN ROW SHARE MODE; -- Lock individual rows for SELECT FOR UPDATE, SELECT FOR KEY SHARE, and SELECT FOR NO KEY UPDATE

-- Transaction 2.1 (SELECT FOR KEY SHARE)
BEGIN;
SELECT * FROM orders WHERE order_id = 1 FOR KEY SHARE; -- Transaction 2 will run as SELECT FOR KEY SHARE not blocked

-- Transaction 2.2 (SELECT FOR UPDATE)
BEGIN;
SELECT * FROM orders WHERE order_id = 1 FOR UPDATE; -- Transaction 2 will run as SELECT FOR UPDATE not blocked

-- Transaction 2.3 (ALTER TABLE)
BEGIN;
ALTER TABLE orders ADD COLUMN order_date DATE; -- Transaction 2 will wait till Transaction 1 commits or rollbacks - DDLs are blocked



-- ROW EXCLUSIVE Lock
-- Transaction 1
BEGIN;
LOCK TABLE orders IN ROW EXCLUSIVE MODE; -- Lock individual rows for INSERT, UPDATE, DELETE, and SELECT FOR UPDATE

-- Transaction 2.1 (SELECT)
BEGIN;
SELECT * FROM orders; -- Not blocked

-- Transaction 2.2 (SELECT FOR UPDATE)
BEGIN;
SELECT * FROM orders WHERE order_id = 1 FOR UPDATE; -- Not blocked

-- Transaction 2.3 (INSERT)
BEGIN;
INSERT INTO orders (order_id, customer_id) VALUES (2, 456); -- Not blocked

-- Transaction 2.4 (LOCK TABLE orders IN EXCLUSIVE MODE)
BEGIN;
LOCK TABLE orders IN EXCLUSIVE MODE; -- Prevent higher level locks, Transaction 2 will wait till Transaction 1 commits or rollbacks - DDLs are blocked

-- ROW EXLUSIVE Lock vs ROW SHARE Lock
-- ROW EXCLUSIVE LOCK is acquired by DMLs at ROW level and it is compatible with ROW SHARE LOCK but not with ROW EXCLUSIVE LOCK.
-- ROW SHARE LOCK is acquired by SELECT FOR UPDATE, SELECT FOR KEY SHARE, and SELECT FOR NO KEY UPDATE at ROW level and it is compatible with both ROW SHARE LOCK and ROW EXCLUSIVE LOCK.




-- SHARE ROW EXCLUSIVE Lock
-- Transaction 1
BEGIN;
LOCK TABLE orders IN SHARE ROW EXCLUSIVE MODE; -- Lock individual rows for SELECT FOR SHARE, SELECT FOR NO KEY UPDATE, and SELECT FOR UPDATE

-- Transaction 2.1 (SELECT)
BEGIN;
SELECT * FROM orders; -- Not blocked

-- Transaction 2.2 (SELECT FOR SHARE)
BEGIN;
SELECT * FROM orders WHERE order_id = 1 FOR SHARE; -- Not blocked (SELECT FORs allowed)

-- Transaction 2.3 (CONFLICT WITH ITSELF)
BEGIN;
LOCK TABLE orders IN SHARE ROW EXCLUSIVE MODE; -- Transaction 2 will wait till Transaction 1 commits or rollbacks - DDLs are blocked




-- SHARE Lock
-- Transaction 1
BEGIN;
LOCK TABLE orders IN SHARE MODE; -- Lock individual rows for SELECT FOR SHARE and SELECT FOR NO KEY UPDATE

-- Transaction 2.1 (SELECT)
BEGIN;
SELECT * FROM orders; -- Not blocked

-- Transaction 2.2 (SHARE LOCK)
BEGIN;
LOCK TABLE orders IN SHARE MODE; -- Not blocked (SHARE LOCKs allowed)



-- SHARE UPDATE EXCLUSIVE Lock
-- CREATED FPR VACUUM, ANALYZE, and CREATE INDEX
