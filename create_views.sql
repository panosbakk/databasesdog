CREATE VIEW project_info AS
SELECT
projects.id, title, summary, budget, starting_date, end_date,
TIMESTAMPDIFF(month, starting_date, end_date) AS duration,
employee_id, emp_name AS employee_name
FROM projects
INNER JOIN ELIDEK_employees ON ELIDEK_employees.id = projects.employee_id;

CREATE VIEW projects_by_researcher AS
SELECT DISTINCT researchers.id AS researcher_id, CONCAT(first_name, ' ', last_name) as full_name, projects.id AS project_id, title
FROM projects
INNER JOIN project_researcher_relationship ON project_researcher_relationship.project_id = projects.id
INNER JOIN researchers ON project_researcher_relationship.researcher_id = researchers.id
ORDER BY researcher_id
