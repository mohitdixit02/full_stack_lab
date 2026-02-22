DROP TABLE IF EXISTS employee; -- DROP TABLE IF EXISTS

-- IF EXISTS is supported by most RDBMS, but not all.
CREATE SEQUENCE IF NOT EXISTS employee_id_seq START WITH 1 INCREMENT BY 1; -- SEQUENCE FOR SURROGATE KEY

-- CREATE --
CREATE TABLE employee(
	employee_id INT DEFAULT nextval('employee_id_seq'), -- SURROGATE KEY
	company_id CHAR(10), -- NATURAL KEY + FIXED LENGTH of 10 characters
	PRIMARY KEY (employee_id, company_id), -- COMPOSITE KEY
	employee_first_name VARCHAR,
	employee_last_name VARCHAR -- VARIABLE LENGTH
);

-- ALTER --
ALTER TABLE employee
ADD COLUMN employee_email VARCHAR UNIQUE NOT NULL, -- unique and not null constraint
ADD COLUMN employee_phone_number CHAR(10) UNIQUE CHECK (employee_phone_number ~ '^\d{10}$'), -- unique constraint + CHECK constraint for 10 digit phone number
ADD COLUMN manager_id INT DEFAULT NULL, -- FOREIGN KEY COLUMN 1 + Default NULL
ADD COLUMN manager_company_id CHAR(10) DEFAULT 'No Manager'; -- FOREIGN KEY COLUMN 2 + Default value

-- SELF REFERENCING FOREIGN KEY
ALTER TABLE employee
ADD CONSTRAINT fk_manager FOREIGN KEY (manager_id, manager_company_id)
REFERENCES employee(employee_id, company_id); -- self referencing foreign key
