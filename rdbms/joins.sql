-- self join
SELECT
    CONCAT(ce.employee_first_name, ' ', ce.employee_last_name) AS employee_name,
	(CASE 
		WHEN me.employee_id IS NULL THEN 'No Manager' 
		ELSE CONCAT(me.employee_first_name, ' ', me.employee_last_name) 
	END) AS manager_name
FROM
	employee ce
LEFT JOIN
	employee me
	ON ce.manager_id = me.employee_id AND ce.manager_company_id = me.company_id;