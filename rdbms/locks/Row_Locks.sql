-- ************** Row Locks **************

-- FOR NO KEY UPDATE
-- Transaction 1
BEGIN;
UPDATE orders SET customer_id = 100 WHERE order_id = 1; -- not a primary key update

-- Transaction 2.1
BEGIN;
UPDATE orders SET customer_id = 200 WHERE order_id = 1; -- UPDATE will be blocked 

-- Transaction 2.2 (SELECT FOR UPDATE)
BEGIN;
SELECT * FROM orders WHERE order_id = 1 FOR  UPDATE; -- SELECT FOR UPDATE will fail

-- Trascation 2.3 (SELECT FOR KEY SHARE)
BEGIN;
SELECT * FROM orders WHERE order_id = 1 FOR KEY SHARE; -- Key share will not blocked as Update is not a key update




-- FOR UPDATE (KEY)
-- Transaction 1
BEGIN;
UPDATE orders SET order_id = 10003 WHERE order_id = 1; -- primary key update

-- Transaction 2.1
BEGIN;
UPDATE orders SET customer_id = 200 WHERE order_id = 1; -- UPDATE will be blocked

-- Transaction 2.2 (SELECT FOR UPDATE)
BEGIN;
SELECT * FROM orders WHERE order_id = 1 FOR UPDATE; -- SELECT FOR UPDATE will be blocked

-- Transaction 2.3 (SELECT FOR KEY SHARE)
BEGIN;
SELECT * FROM orders WHERE order_id = 1 FOR KEY SHARE; -- Key share will be blocked as Update is a key update




-- FOR NO KEY UPDATE - SELECT
-- Transaction 1
BEGIN;
SELECT * FROM orders WHERE order_id = 1 FOR NO KEY UPDATE; -- Transaction 1 will acquire a lock on the row with order_id = 1,
-- but it will not block other transactions from acquiring locks on the same row for key updates.

-- Transaction 2.1 (SELECT FOR KEY SHARE)
BEGIN;
SELECT * FROM orders WHERE order_id = 1 FOR KEY SHARE; -- Trancation 2 will run as SELECT FOR KEY SHARE not blocked

-- Transaction 2.2 (SELECT FOR UPDATE)
BEGIN;
SELECT * FROM orders WHERE order_id = 1 FOR UPDATE; -- Transaction 2 will wait till Transaction 1 commits or rollbacks



-- FOR UPDATE - SELECT
-- Transaction 1
BEGIN;
SELECT * FROM orders WHERE order_id = 1 FOR UPDATE; -- Transaction 1 will acquire a lock on the row with order_id = 1,

-- Transaction 2.1 (SELECT FOR KEY SHARE)
BEGIN;
SELECT * FROM orders WHERE order_id = 1 FOR KEY SHARE; -- Transaction 2 will wait till Transaction 1 commits or rollbacks

-- Transaction 2.2 (SELECT FOR UPDATE)
BEGIN;
SELECT * FROM orders WHERE order_id = 1 FOR UPDATE; -- Transaction 2 will wait till Transaction 1 commits or rollbacks




-- FOR SHARE - SELECT
-- Transaction 1
BEGIN;
SELECT * FROM orders WHERE order_id = 1 FOR SHARE; -- Transaction 1 will acquire a shared lock on the row with order_id = 1,

-- Transaction 2.1 (SELECT FOR KEY SHARE)
BEGIN;
SELECT * FROM orders WHERE order_id = 1 FOR KEY SHARE; -- Transaction 2 will run as SELECT FOR KEY SHARE not blocked

-- Transaction 2.2 (SELECT FOR UPDATE)
BEGIN;
SELECT * FROM orders WHERE order_id = 1 FOR UPDATE; -- Transaction 2 will wait till Transaction 1 commits or rollbacks



-- FOR KEY SHARE - SELECT
-- Transaction 1
BEGIN;
SELECT * FROM orders WHERE order_id = 1 FOR KEY SHARE; -- Transaction 1 will acquire a key share lock on the row with order_id = 1,

-- Transaction 2.1 (FOR SHARE)
BEGIN;
SELECT * FROM orders WHERE order_id = 1 FOR SHARE; -- Transaction 2 will run as FOR SHARE not blocked

-- Transaction 2.2 (SELECT FOR UPDATE - NO KEY)
BEGIN;
SELECT * FROM orders WHERE order_id = 1 FOR NO KEY UPDATE; -- Transaction 2 will run as SELECT FOR NO KEY UPDATE not blocked

-- Transaction 2.3 (SELECT FOR UPDATE - KEY)
BEGIN;
SELECT * FROM orders WHERE order_id = 1 FOR UPDATE; -- Transaction 2 will wait till Transaction 1 commits or rollbacks

