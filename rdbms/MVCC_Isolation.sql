-- MVCC Snapshot Behaviour
-- Postgress don't support dirty reads, so we can't see uncommitted data from other transactions.

-- Locking by Select
-- Transaction in terminal 1
SET TRANSACTION ISOLATION LEVEL READ COMMITTED;
BEGIN;
SELECT * FROM orders where order_id = 1; -- 100 initial id

-- Transaction in terminal 2
BEGIN;
UPDATE orders SET customer_id = 200 WHERE order_id = 1;
COMMIT;
-- Second Transaction will go on hold until the first transaction is committed, 
-- and then it will see the updated value of customer_id = 200.



-- Phantom Reads
-- Transaction in terminal 1
SET TRANSACTION ISOLATION LEVEL REPEATABLE READ;
BEGIN;
SELECT * FROM orders WHERE customer_id = 100; -- returns 99 row

-- Transaction in terminal 2
BEGIN;
INSERT INTO orders (order_id, customer_id) VALUES (10000001, 100);
COMMIT;

-- Transaction in terminal 1
SELECT * FROM orders WHERE customer_id = 100; 
-- still returns 99 row, 
-- no phantom read occurs due to REPEATABLE READ isolation level.
-- With Read Committed, Transaction in terminal 1 return 100 rows, after commit

COMMIT;
-- After COMMIT in terminal 1, 100 rows visible on re-run




-- Lost Update
UPDATE orders SET customer_id = 100 WHERE order_id = 1;

-- Transaction in terminal 1
SET TRANSACTION ISOLATION LEVEL REPEATABLE READ;
BEGIN;
SELECT customer_id FROM orders WHERE order_id = 1; -- returns 100
UPDATE orders SET customer_id = customer_id + 10 WHERE order_id = 1; -- 110

-- Transaction in terminal 2
BEGIN;
SELECT customer_id FROM orders WHERE order_id = 1; -- returns 100
UPDATE orders SET customer_id = customer_id + 20 WHERE order_id = 1; -- 120

-- ERROR:  could not serialize access due to concurrent update 
-- Both transactions are trying to update the same row based on the same initial value
-- PostgreSQL detects this conflict and raises an error to prevent lost updates, ensuring data integrity.



-- ****************** Write Skew ******************
-- Trigger to delete 
CREATE OR REPLACE FUNCTION prevent_last_order_delete()
RETURNS TRIGGER AS $$
BEGIN
    IF OLD.customer_id = 765 THEN
        IF (SELECT COUNT(*) FROM orders WHERE customer_id = 765) <= 1 THEN
            RAISE EXCEPTION 'Cannot delete the last order for customer_id 100';
        END IF;
    END IF;
    RETURN OLD;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER prevent_last_order_delete_trigger
BEFORE DELETE ON orders
FOR EACH ROW EXECUTE FUNCTION prevent_last_order_delete();


-- To remove the trigger
DROP TRIGGER IF EXISTS prevent_last_order_delete_trigger ON orders;
DROP FUNCTION IF EXISTS prevent_last_order_delete();

INSERT INTO orders (order_id, customer_id) VALUES (100001, 765), (100002, 765);

-- Transaction in terminal 1
SET TRANSACTION ISOLATION LEVEL REPEATABLE READ;
BEGIN;
SELECT COUNT(*) FROM orders WHERE customer_id = 100; -- returns 2

-- Decides to delete one order
DELETE FROM orders WHERE order_id = 100001;

-- Transaction in terminal 2
SET TRANSACTION ISOLATION LEVEL REPEATABLE READ;
BEGIN;
SELECT COUNT(*) FROM orders WHERE customer_id = 100; -- returns 2

-- Decides to delete one order
DELETE FROM orders WHERE order_id = 100002;

-- Run COMMIT in both transactions, at last
COMMIT;

SELECT * FROM orders WHERE customer_id = 765; -- No rows left leading to data loss breaking trigger constraint. - Write Skew



-- ******************* Using Serializable Isolation Level to Prevent Write Skew *******************
-- Transaction in terminal 1
SET TRANSACTION ISOLATION LEVEL SERIALIZABLE;
BEGIN;
SELECT COUNT(*) FROM orders WHERE customer_id = 765; -- returns 2
DELETE FROM orders WHERE order_id = 100001;

-- Transaction in terminal 2
SET TRANSACTION ISOLATION LEVEL SERIALIZABLE;
BEGIN;
SELECT COUNT(*) FROM orders WHERE customer_id = 765; -- returns 2
DELETE FROM orders WHERE order_id = 100002;

-- Run COMMIT in both transactions, at last
COMMIT:

-- One of the transactions will fail with a serialization error, 
-- preventing the write skew and ensuring that at least one order remains
-- ERROR:  Reason code: Canceled on identification as a pivot,
-- during commit attempt.could not serialize access due to read/write dependencies among transactions 
