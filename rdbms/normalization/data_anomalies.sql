-- COMMON Table for Employee and Departments
DROP TABLE IF EXISTS employee_department_anomaly; -- DROP TABLE IF EXISTS
CREATE TABLE employee_department_anomaly (
	employee_id INT PRIMARY KEY,
	department_id INT,
	employee_first_name VARCHAR,
	employee_last_name VARCHAR,
	department_name VARCHAR
);

INSERT INTO 
employee_department_anomaly (employee_id, department_id, employee_first_name, employee_last_name, department_name) 
VALUES
(1, 101, 'John', 'Doe', 'HR'),
(2, 102, 'Jane', 'Smith', 'Finance'),
(3, 103, 'Alice', 'Johnson', 'IT'),
(4, 104, 'Bob', 'Brown', 'Marketing'),
(5, 105, 'Charlie', 'Davis', 'Sales'),
(6, 103, 'Eve', 'Wilson', 'IT'),
(7, 103, 'Frank', 'Miller', 'IT'),
(8, 104, 'Ivy', 'Thomas', 'Marketing');

-- ************ INSERTION ANOMALIES ************
-- Inserting a new department without an employee
INSERT INTO employee_department_anomaly (employee_id, department_id, employee_first_name, employee_last_name, department_name)
VALUES (NULL, 106, NULL, NULL, 'Legal'); -- This creates an anomaly as we have a department without an employee.

-- ******** DELETION ANOMALIES ************
-- Deleting an employee who is the only one in a department
-- This deletes John Doe and also removes the HR department from the database, creating an anomaly.
DELETE FROM employee_department_anomaly WHERE employee_id = 1; 

-- ********** UPDATE ANOMALIES **********
-- Updating the department name from IT to Technology
-- This creates an anomaly as we have to update multiple rows to maintain consistency.
UPDATE employee_department_anomaly SET department_name = 'Technology' WHERE department_name = 'IT';

