-- This query retrieves all the table constraints defined in the database, including primary keys, foreign keys, unique constraints, and check constraints.
select * from information_schema.table_constraints; 

-- This query retrieves all the foreign key constraints defined in the database, including the table and column names involved in the foreign key relationships.
select * from pg_catalog.pg_constraint;

-- TRUNCATE TABLE preserving the schema and constraints, only removing rows
TRUNCATE TABLE employee;

SELECT COUNT(*) FROM employee; -- Should return 0 after truncation

-- Multi Row insertion
INSERT INTO employee(
    employee_id,
	company_id,
	employee_first_name,
	employee_last_name,
	employee_email,
	employee_phone_number,
	manager_id,
	manager_company_id
) VALUES 
-- If company id size is less than 10, right side padding with spaces will be done by RDBMS.
-- Not using default value for employee_id
(1, 'COMP000001', 'John', 'Doe', 'john_does123@gmail.com', '1234567890', NULL, NULL),
(2, 'COMP000001', 'Jane', 'Smith', 'jane_smith123@gmail.com', '0987654321', 1, 'COMP000001'),
(3, 'COMP000002', 'Alice', 'Johnson', 'alice_johnson@gmail.com', '1112223333', 2, 'COMP000001'),
(4, 'COMP000001', 'Robert', 'Brown', 'robert.brown@email.com', '2223334444', 1, 'COMP000001'),
(5, 'COMP000001', 'Emily', 'Clark', 'emily.clark@email.com', '3334445555', 2, 'COMP000001'),
(6, 'COMP000002', 'Michael', 'Lee', 'michael.lee@email.com', '4445556666', 3, 'COMP000002'),
(7, 'COMP000002', 'Sophia', 'Martinez', 'sophia.martinez@email.com', '5556667777', 3, 'COMP000002'),
(8, 'COMP000001', 'David', 'Wilson', 'david.wilson@email.com', '6667778888', 4, 'COMP000001');


-- *********** FOREIGN KEY CONSTRAINT - Default behavior is NO ACTION ***********
-- Error on delete because John Doe is referenced by other employees
DELETE FROM employee WHERE employee_id = 1 AND company_id = 'COMP000001';



-- ***** FOREIGN KEY CONSTRAINT - CASCADE DELETE ******
ALTER TABLE employee
DROP CONSTRAINT fk_manager, -- Drop existing foreign key constraint
ADD CONSTRAINT fk_manager FOREIGN KEY (manager_id, manager_company_id)
REFERENCES employee(employee_id, company_id) ON DELETE CASCADE; -- Add new foreign key

-- This will delete John Doe and all his subordinates (Jane Smith, Robert Brown)
-- and further subordinates of Jane Smith (Alice and Emily) and Robert Brown (David Wilson)
-- Table will be empty after this delete operation
DELETE FROM employee WHERE employee_id = 1 AND company_id = 'COMP000001';



-- ***** FOREIGN KEY CONSTRAINT - SET NULL ******
ALTER TABLE employee
DROP CONSTRAINT fk_manager, -- Drop existing foreign key constraint
ADD CONSTRAINT fk_manager FOREIGN KEY (manager_id, manager_company_id)
REFERENCES employee(employee_id, company_id) ON DELETE SET NULL; -- Add new foreign key

-- All subordinates of John Doe will have their manager_id and manager_company_id set to NULL,
-- everything else will remain intact. Only John Doe will be deleted.
DELETE FROM employee WHERE employee_id = 1 AND company_id = 'COMP000001';



-- ***** FOREIGN KEY CONSTRAINT - SET DEFAULT ******
ALTER TABLE employee
DROP CONSTRAINT fk_manager, -- Drop existing foreign key constraint
ADD CONSTRAINT fk_manager FOREIGN KEY (manager_id, manager_company_id)
REFERENCES employee(employee_id, company_id) ON DELETE SET DEFAULT; -- Add new foreign key

-- All subordinates of John Doe will have their manager_id and manager_company_id set to NULL,
-- everything else will remain intact. Only John Doe will be deleted.
DELETE FROM employee WHERE employee_id = 1 AND company_id = 'COMP000001';



-- ***** FOREIGN KEY CONSTRAINT - RESTRICT vs NO ACTION ******
-- RESTRICT will prevent deletion if there are referencing rows even if the dependency is resolved by the end of the transaction
-- NO ACTION will allow deletion but will throw an error if there are referencing rows and dependency is not resolved by the end of the transaction

-- Using RESTRICT
ALTER TABLE employee
DROP CONSTRAINT fk_manager, -- Drop existing foreign key constraint
ADD CONSTRAINT fk_manager FOREIGN KEY (manager_id, manager_company_id)
REFERENCES employee(employee_id, company_id) ON DELETE RESTRICT -- Add new foreign key
DEFERRABLE INITIALLY DEFERRED; -- Deferrable constraint allows the check to be deferred until the end of the transaction

-- Transaction
BEGIN;
DELETE FROM employee WHERE employee_id = 1 AND company_id = 'COMP000001'; -- transaction will fail immediately due to RESTRICT constraint
UPDATE employee SET manager_id = NULL, manager_company_id = NULL WHERE manager_id = 1 AND manager_company_id = 'COMP000001';
COMMIT;

-- Using NO ACTION
ALTER TABLE employee
DROP CONSTRAINT fk_manager, -- Drop existing foreign key constraint
ADD CONSTRAINT fk_manager FOREIGN KEY (manager_id, manager_company_id)
REFERENCES employee(employee_id, company_id) ON DELETE NO ACTION -- Add new foreign key
DEFERRABLE INITIALLY DEFERRED; -- Deferrable constraint allows the check to be deferred until the end of the transaction

-- Transaction
BEGIN;
DELETE FROM employee WHERE employee_id = 1 AND company_id = 'COMP000001'; -- transaction will succeed as dependency is resolved at the end of transaction
UPDATE employee SET manager_id = NULL, manager_company_id = NULL WHERE manager_id = 1 AND manager_company_id = 'COMP000001';
COMMIT;


-- ***** FOREIGN KEY CONSTRAINT - ON DELETE/ ON UPDATE *****
-- Set custom behavior for both delete and update operations on the referenced table
