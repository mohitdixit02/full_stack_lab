-- SQL View Implementation

-- CREATE VIEW - Employee details with Manager Name - Wrap the below SQL Query in a view
CREATE VIEW EmployeeManagerView AS
SELECT 
    e.employee_id AS employee_id,
    CONCAT(e.employee_first_name, ' ', e.employee_last_name) AS employee_name,
    m.employee_id AS manager_id,
    CONCAT(m.employee_first_name, ' ', m.employee_last_name) AS manager_name
FROM 
    employee e
LEFT JOIN
    employee m ON e.manager_id = m.employee_id;

-- Fetch from View - It always run the above SQL Query to fetch latest data from the view
SELECT * FROM EmployeeManagerView;


-- UPDATE VIEW - only update if view is from single table and not from multiple tables, otherwise it will throw error
UPDATE EmployeeManagerView
SET employee_name = 'John Doe'
WHERE employee_id = 1; -- throw error because view is from multiple tables

-- CREATE OR REPLACE VIEW - to update the view definition
CREATE OR REPLACE VIEW EmployeeManagerView AS
SELECT 
    e.employee_id AS employee_id,
    CONCAT(e.employee_first_name, ' ', e.employee_last_name) AS employee_name,
    m.employee_id AS manager_id,
    CONCAT(m.employee_first_name, ' ', m.employee_last_name) AS manager_name,
    e.company_id AS company_id
FROM
    employee e
LEFT JOIN
    employee m ON e.manager_id = m.employee_id;


-- RENAME VIEW - to rename the view -- depends on the RDBMS
ALTER VIEW EmployeeManagerView RENAME TO EmployeeDetailsView; -- PostgreSQL syntax

-- DROP VIEW - to delete the view
DROP VIEW EmployeeDetailsView;
