/* =====================
	QUERY 3.1 !!! PROBABLY CORRECT !!!
======================*/

SELECT * from programs;

SET @id = 3;

SELECT DISTINCT
researchers.id,
CONCAT(first_name, ' ', last_name) as full_name,
TIMESTAMPDIFF(year, researchers.birth_date, CURRENT_DATE()) as age,
sex
FROM researchers
INNER JOIN project_researcher_relationship ON project_researcher_relationship.researcher_id = id
INNER JOIN projects ON project_researcher_relationship.project_id = projects.id
WHERE projects.id = @id;
ORDER BY researchers.id

SET @starting_date = '';
SET @duration = 25;
SET @employee_id = 1;

SELECT * FROM project_info
WHERE starting_date = @starting_date OR duration = @duration OR employee_id = @employee_id

/* =====================
	QUERY 3.2 !!! PROBABLY CORRECT !!!
======================*/

SELECT * FROM projects_by_researcher;
SELECT * FROM project_info;

/* =====================
	QUERY 3.3 !!! leipei to Teleutaio etos/ennoeitai? !!!
======================*/

SET @field_name = 'Natural science';

SELECT project_researcher_relationship.project_id, projects.title, project_researcher_relationship.researcher_id, CONCAT(first_name, ' ', last_name) as full_name
FROM projects
INNER JOIN project_researcher_relationship ON project_researcher_relationship.project_id = projects.id
INNER JOIN researchers ON project_researcher_relationship.researcher_id = researchers.id
INNER JOIN project_scientific_field ON project_scientific_field.project_id = projects.id
INNER JOIN scientific_fields ON project_scientific_field.field_id = scientific_fields.id
WHERE field_name = @field_name AND projects.end_date = '0000-00-00'

/* =====================
	QUERY 3.4 !!! PROBABLY CORRECT !!!
======================*/

SELECT l.organization_id, l.org_name, l.projects_number
FROM (
SELECT DISTINCT
A.organization_id, org_name, COUNT(A.id) AS projects_number
FROM projects A
INNER JOIN organizations ON A.organization_id = organizations.id
WHERE EXISTS (
	SELECT 1 FROM projects B
	INNER JOIN organizations ON B.organization_id = organizations.id
	WHERE B.organization_id = A.organization_id
	AND year(A.starting_date) = year(B.starting_date) + 1
)
GROUP BY A.organization_id
) AS l INNER JOIN (
SELECT DISTINCT
A.organization_id, COUNT(A.id) AS projects_number
FROM projects A
INNER JOIN organizations ON A.organization_id = organizations.id
WHERE EXISTS (
	SELECT 1 FROM projects B
	INNER JOIN organizations ON B.organization_id = organizations.id
	WHERE B.organization_id = A.organization_id
	AND year(B.starting_date) = year(A.starting_date) + 1
)
GROUP BY A.organization_id
) AS m ON l.organization_id = m.organization_id
WHERE l.projects_number = m.projects_number AND l.projects_number >= 1
GROUP BY l.organization_id
ORDER BY l.projects_number DESC

/* =====================
	QUERY 3.5 !!! PROBABLY CORRECT !!!
======================*/

SELECT DISTINCT field_pair, COUNT(field_pair) AS sum
FROM (
	SELECT CONCAT(A.field_id, ' ', B.field_id) AS field_pair, A.project_id
	FROM project_scientific_field A, project_scientific_field B
	WHERE A.field_id != B.field_id AND A.project_id = B.project_id
	ORDER BY A.project_id
) AS kekw
WHERE field_pair LIKE '1_2' OR field_pair LIKE '1_3' OR field_pair LIKE '1_4' OR field_pair LIKE '2_3' OR field_pair LIKE '2_4' OR field_pair LIKE '3_4'
GROUP BY kekw.field_pair
ORDER BY sum DESC, field_pair ASC
LIMIT 3

/* =====================
	QUERY 3.6 !!! PROBABLY CORRECT !!!
======================*/

SELECT DISTINCT
CONCAT(first_name, ' ', last_name) AS full_name,
COUNT(project_researcher_relationship.project_id) AS projects_number
FROM researchers
INNER JOIN project_researcher_relationship ON project_researcher_relationship.researcher_id = researchers.id
INNER JOIN projects ON project_researcher_relationship.project_id = projects.id
WHERE projects.end_date IS NULL AND TIMESTAMPDIFF(year, researchers.birth_date, CURRENT_DATE()) < 40 
GROUP BY researchers.id
ORDER BY projects_number DESC

/* =====================
	QUERY 3.7 !!! PROBABLY CORRECT !!!
======================*/

SELECT emp_name, org_name AS company_name, SUM(projects.budget) AS total_finance
FROM ELIDEK_employees
INNER JOIN projects ON projects.employee_id = ELIDEK_employees.id
INNER JOIN organizations ON projects.organization_id = organizations.id
INNER JOIN company ON company.organization_id = organizations.id
GROUP BY organizations.id
ORDER BY total_finance DESC
LIMIT 5

/* =====================
	QUERY 3.8 !!! PROBABLY CORRECT !!!
======================*/

SELECT DISTINCT
CONCAT(first_name, ' ', last_name) AS full_name,
COUNT(project_researcher_relationship.project_id) AS projects_number
FROM researchers
INNER JOIN project_researcher_relationship ON project_researcher_relationship.researcher_id = researchers.id
INNER JOIN projects ON project_researcher_relationship.project_id = projects.id
INNER JOIN deliverable ON deliverable.project_id = projects.id
WHERE deliverable.project_id != project_researcher_relationship.project_id
GROUP BY researchers.id
HAVING COUNT(project_researcher_relationship.project_id) >= 5

set statistics time on 

SELECT DISTINCT ReservationCustomers.NFC_code, Customers.First_name, Customers.Last_name, Customers.Issuing_authority, Customers.Email, Customers.Phone
FROM
(SELECT DoorAccessLog.ReservationCustomer_ID, DoorAccessLog.Door_ID, Entry_time, Exit_time
FROM DoorAccessLog inner join ReservationCustomers on ReservationCustomers.ReservationCustomer_ID = DoorAccessLog.ReservationCustomer_ID
inner join Customers on Customers.Customer_ID = ReservationCustomers.Customer_ID
WHERE ReservationCustomers.NFC_code = 9297324) AS Covid
INNER JOIN DoorAccessLog ON DoorAccessLog.Door_ID = Covid.Door_ID
inner join ReservationCustomers on ReservationCustomers.ReservationCustomer_ID = DoorAccessLog.ReservationCustomer_ID
inner join Customers on Customers.Customer_ID = ReservationCustomers.Customer_ID
WHERE (DoorAccessLog.Entry_time > Covid.Entry_time AND DoorAccessLog.Entry_time <= DATEADD(HOUR, 1,Covid.Exit_time))
OR (Covid.Entry_time > DoorAccessLog.Entry_time AND Covid.Entry_time < DoorAccessLog.Exit_time)


set statistics time off



set statistics time on

SELECT HotelLocations.Location_name, COUNT(HotelLocations.Location_name) as times_visited
FROM DoorAccessLog
INNER JOIN ReservationCustomers ON ReservationCustomers.ReservationCustomer_ID = DoorAccessLog.ReservationCustomer_ID
INNER JOIN Doors ON Doors.Door_ID = DoorAccessLog.Door_ID
INNER JOIN HotelLocations ON Doors.HotelLocation_ID = HotelLocations.HotelLocation_ID
INNER JOIN Customers ON ReservationCustomers.Customer_ID = Customers.Customer_ID
WHERE datediff(YY, Customers.Birth_date, getdate()) BETWEEN '20' and '40' and DoorAccessLog.Entry_time BETWEEN '2020-07-21' and '2021-08-30'
GROUP BY HotelLocations.Location_name
ORDER BY times_visited DESC;

set statistics time off

-- Query 11 ii --

set statistics time on

SELECT HotelLocations.Location_name, COUNT(HotelLocations.Location_name) as times_visited
FROM DoorAccessLog
INNER JOIN ReservationCustomers ON ReservationCustomers.ReservationCustomer_ID = DoorAccessLog.ReservationCustomer_ID
INNER JOIN Doors ON Doors.Door_ID = DoorAccessLog.Door_ID
INNER JOIN HotelLocations ON Doors.HotelLocation_ID = HotelLocations.HotelLocation_ID
INNER JOIN HotelServices ON  HotelServices.HotelService_ID = HotelLocations.HotelService_ID
INNER JOIN Customers ON ReservationCustomers.Customer_ID = Customers.Customer_ID
WHERE datediff(YY, Customers.Birth_date, getdate()) BETWEEN '20' and '40' and DoorAccessLog.Entry_time BETWEEN '2020-07-21' and '2021-08-30'
GROUP BY HotelLocations.Location_name
ORDER BY times_visited DESC;

set statistics time off


-- Query 11 iii --
set statistics time on

SELECT  Serv_cust.HotelService_name, COUNT( Serv_cust.HotelService_name) AS VAL_OC
FROM 
	(SELECT DISTINCT  ReservationCustomers.Customer_ID, HotelServices.HotelService_name
	FROM DoorAccessLog
	INNER JOIN ReservationCustomers ON ReservationCustomers.Customer_ID = DoorAccessLog.ReservationCustomer_ID
	INNER JOIN Doors ON Doors.Door_ID = DoorAccessLog.Door_ID
	INNER JOIN HotelLocations ON Doors.HotelLocation_ID = HotelLocations.HotelLocation_ID
	INNER JOIN HotelServices ON  HotelServices.HotelService_ID = HotelLocations.HotelService_ID) AS Serv_cust
	GROUP BY Serv_cust.HotelService_name
	ORDER BY VAL_OC DESC;


set statistics time off