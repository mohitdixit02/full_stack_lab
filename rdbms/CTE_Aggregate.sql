-- Using Tables from Normalization Section
-- game_player
-- player
-- skill_level
-- skill_ability

-- Nested CTE Implementation + AVG + SUM (Aggregate Functions) + CASE (Conditional Logic)
WITH average_inventory AS (
    SELECT
        AVG(quantity) AS avg_inventory_size
    FROM
        game_player
),
sum_inventory AS (
    SELECT
        player_id,
        SUM(quantity) AS total_inventory
    FROM
        game_player
    GROUP BY
        player_id
)
SELECT
    p.player_id,
    p.player_name,
    si.total_inventory,
    (CASE
        WHEN si.total_inventory > ai.avg_inventory_size THEN 'Above Average'
        WHEN si.total_inventory < ai.avg_inventory_size THEN 'Below Average'
        ELSE 'Average'
    END) AS inventory_comparison
FROM
    player p
JOIN game_player gp ON p.player_id = gp.player_id
JOIN sum_inventory si ON p.player_id = si.player_id
CROSS JOIN average_inventory ai -- CROSS JOIN as it is single row result
GROUP BY
    p.player_id,
    p.player_name,
    si.total_inventory,
    ai.avg_inventory_size;



-- Recursive CTE Implementation on Employee Table
WITH RECURSIVE employee_hierarchy AS (
    -- Anchor member: Start with top-level employees (those without a manager)
    SELECT
        employee_id,
		company_id,
        CONCAT(employee_first_name, ' ', employee_last_name) AS employee_name,
        manager_id,
        1 AS level
    FROM
        employee
    WHERE
        manager_id IS NULL

    UNION ALL

    -- Recursive member: Join employees with their managers
    SELECT
        e.employee_id,
        e.company_id,
        CONCAT(e.employee_first_name, ' ', e.employee_last_name) AS employee_name,
        e.manager_id,
        eh.level + 1 AS level
    FROM
        employee e
    JOIN employee_hierarchy eh ON e.manager_id = eh.employee_id
)
SELECT
    employee_id,
    company_id,
    employee_name,
    manager_id,
    level
FROM
    employee_hierarchy
ORDER BY
    level, employee_id;



-- SUBQUERY Implementation on Employee Table
SELECT
    e.employee_id,
    e.company_id,
    CONCAT(e.employee_first_name, ' ', e.employee_last_name) AS employee_name,
    e.manager_id,
    manager_info.manager_name,
    manager_info.manager_company_id
FROM
    employee e
LEFT JOIN 
    (
        SELECT 
            me.employee_id,
            CONCAT(me.employee_first_name, ' ', me.employee_last_name) AS manager_name,
            me.company_id AS manager_company_id
        FROM 
            employee me
    ) AS manager_info ON e.manager_id = manager_info.employee_id
ORDER BY
    e.employee_id;


-- ************* CORRELATED SUBQUERY Implementation *************
-- Correlated subquery will execute for each row in the employee table, which can lead to performance issues if the employee table is large. 
-- The previous implementation using a LEFT JOIN with a subquery is generally more efficient for this type of query.
SELECT
    e.employee_id,
    e.company_id,
    CONCAT(e.employee_first_name, ' ', e.employee_last_name) AS employee_name,
    e.manager_id,
    (SELECT CONCAT(me.employee_first_name, ' ', me.employee_last_name) 
     FROM employee me 
     WHERE me.employee_id = e.manager_id) AS manager_name,
    (SELECT me.company_id 
     FROM employee me 
     WHERE me.employee_id = e.manager_id) AS manager_company_id
FROM
    employee e
ORDER BY
    e.employee_id;

