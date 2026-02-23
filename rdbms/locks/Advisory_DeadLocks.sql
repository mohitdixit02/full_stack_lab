-- **************** Advisory Locks ****************

-- ***** Session Locks *****
-- Transaction 1
SELECT pg_advisory_lock(1); -- Transaction 1 will acquire an advisory lock with the key 1

-- Transaction 2
SELECT pg_advisory_lock(1); -- Transaction 2 will wait till Transaction 1 releases the advisory lock with the key 1

-- Transaction 1
SELECT pg_advisory_unlock(1); -- Transaction 1 will release the advisory lock with the key 1, allowing Transaction 2 to acquire it


-- Transaction Locks
-- Transaction 1
BEGIN;
SELECT pg_advisory_xact_lock(1); -- Transaction 1 will acquire an advisory lock with the key 1 for the duration of the transaction

-- Transaction 2
BEGIN;
SELECT pg_advisory_xact_lock(1); -- Transaction 2 will wait till Transaction 1 commits or rollbacks, releasing the advisory lock with the key 1

-- Transaction 1
COMMIT; -- Transaction 1 will commit, releasing the advisory lock with the key 1, allowing Transaction 2 to acquire it



-- **************** DEADLOCKS ****************
-- ***** Transaction 1 *****
BEGIN;
SELECT pg_advisory_lock(1); -- Transaction 1 will acquire an advisory lock with the key 1

-- Transaction 2
BEGIN;
SELECT pg_advisory_lock(2); -- Transaction 2 will acquire an advisory lock with the key 2

-- Transaction 1
SELECT pg_advisory_lock(2); -- Transaction 1 will wait for Transaction 2 to release the advisory lock with the key 2

-- Transaction 2
SELECT pg_advisory_lock(1); -- Transaction 2 will wait for Transaction 1 to release the advisory lock with the key 1

-- Above scenario results in a deadlock
-- ERROR:  deadlock detected
-- SQL state: 40P01
-- Detail: Process 27252 waits for ExclusiveLock on advisory lock [5,0,1,1]; blocked by process 19564.
-- Process 19564 waits for ExclusiveLock on advisory lock [5,0,2,1]; blocked by process 27252.
