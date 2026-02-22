-- Multi-valued dependency as per skill level
-- Begineer - Can JUMP and RUN
-- Intermediate - Can JUMP, RUN and SWIM
-- Advanced - Can JUMP, RUN, SWIM and FLY

ALTER TABLE skill_level
ADD COLUMN abilities VARCHAR; -- Adding a column to represent the abilities associated with each skill level

DROP TABLE IF EXISTS skill_level;
CREATE TABLE skill_level (
    player_rating VARCHAR,
    player_skill_level VARCHAR,
    abilities VARCHAR,
    PRIMARY KEY (player_rating, abilities)
);

INSERT INTO skill_level (player_rating, player_skill_level, abilities)
VALUES
('A', 'Beginner', 'JUMP'),
('A', 'Beginner', 'RUN'),
('B', 'Beginner', 'JUMP'),
('B', 'Beginner', 'RUN'),
('C', 'Intermediate', 'JUMP'),
('C', 'Intermediate', 'RUN'),
('C', 'Intermediate', 'SWIM'),
('D', 'Intermediate', 'JUMP'),
('D', 'Intermediate', 'RUN'),
('D', 'Intermediate', 'SWIM'),
('E', 'Advanced', 'JUMP'),
('E', 'Advanced', 'RUN'),
('E', 'Advanced', 'SWIM'),
('E', 'Advanced', 'FLY'),
('F', 'Advanced', 'JUMP'),
('F', 'Advanced', 'RUN'),
('F', 'Advanced', 'SWIM'),
('F', 'Advanced', 'FLY')

-- 4NF Violation
-- Ability has no dependency on player skill (JUMP is possible both for beginner and advanced)
-- Every skill has defined abilities, but abilities are not dependent on skill, which leads to a multi-valued dependency.

-- ********** Update Anomaly **********
-- If we update any skill level name, we have to update all the records for that skill level

-- ******** Deletion Anomaly **********
-- If we delete Advanvce skill level, we lose info about FLY ability as well

-- 4NF Normalization
-- We can create a separate table for abilities and establish a relationship between skill levels and abilities.

DROP TABLE IF EXISTS skill_ability;
CREATE TABLE skill_ability (
    player_skill_level VARCHAR,
    ability VARCHAR,
    PRIMARY KEY (player_skill_level, ability)
);

ALTER TABLE skill_level
DROP COLUMN abilities; -- Removing the multi-valued dependency from skill_level table
TRUNCATE TABLE skill_level;

INSERT INTO skill_level (player_rating, player_skill_level)
VALUES
('A', 'Beginner'),
('B', 'Beginner'),
('C', 'Intermediate'),
('D', 'Intermediate'),
('E', 'Advanced'),
('F', 'Advanced');

INSERT INTO skill_ability (player_skill_level, ability)
VALUES
('Beginner', 'JUMP'),
('Beginner', 'RUN'),
('Intermediate', 'JUMP'),
('Intermediate', 'RUN'),
('Intermediate', 'SWIM'),
('Advanced', 'JUMP'),
('Advanced', 'RUN'),
('Advanced', 'SWIM'),
('Advanced', 'FLY');
