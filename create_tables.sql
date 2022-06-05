drop database mydb;
create database mydb;
use mydb;

/* =====================
	CREATE ENTITIES 
======================*/

DROP TABLE IF EXISTS projects;
CREATE TABLE projects
(
	id int auto_increment PRIMARY KEY,
    title varchar (30) not null,
	summary varchar (255) not null,
	budget DECIMAL(9,2) not null,
	starting_date date not null,
    end_date date,
    CONSTRAINT more_than_100k CHECK (budget >= 100000.00),
    CONSTRAINT less_than_1m CHECK (budget <= 1000000.00),
    CONSTRAINT more_than_1year CHECK (TIMESTAMPDIFF(month, starting_date, end_date) >= 12),
    CONSTRAINT less_than_4years CHECK (TIMESTAMPDIFF(month, starting_date, end_date) <= 48)
);

DROP TABLE IF EXISTS researchers;
CREATE TABLE researchers
(
	id int auto_increment PRIMARY KEY,
    first_name varchar (30) not null,
    last_name varchar (30) not null,
    sex ENUM('Male', 'Female', 'Other') not null,
	birth_date date not null,
    CONSTRAINT sex_enum CHECK (sex REGEXP 'Male|Female|Other'),
    CONSTRAINT over_18yo CHECK (TIMESTAMPDIFF(year, birth_date, CURRENT_DATE()) >= 18)
);

DROP TABLE IF EXISTS organizations;
CREATE TABLE organizations
(
	id int auto_increment PRIMARY KEY,
    org_name varchar (30) not null,
	abbreviation varchar (4) not null,
    street varchar (50) not null,
    street_number int not null,
    postal_code int not null,
    city varchar (30) not null
);

DROP TABLE IF EXISTS ELIDEK_employees;
CREATE TABLE ELIDEK_employees
(
	id int auto_increment PRIMARY KEY,
    emp_name varchar (60) not null
);

DROP TABLE IF EXISTS programs;
CREATE TABLE programs
(
	id int auto_increment PRIMARY KEY,
    prog_name varchar (30) not null,
	prog_address varchar (30) not null
);

DROP TABLE IF EXISTS scientific_fields;
CREATE TABLE scientific_fields
(
    id int auto_increment PRIMARY KEY,
	field_name ENUM('Natural science', 'Formal science', 'Social science', 'Applied science') not null,
    CONSTRAINT field_enum CHECK (field_name REGEXP 'Natural science|Formal science|Social science|Applied science')
);

DROP TABLE IF EXISTS deliverable;
CREATE TABLE deliverable
(
    id int auto_increment PRIMARY KEY,
	title varchar (30) not null,
    summary varchar (255) not null,
    delivery_date date not null
);

DROP TABLE IF EXISTS phones;
CREATE TABLE phones
(
	organization_id int,
    FOREIGN KEY (organization_id) REFERENCES organizations(id) ON DELETE CASCADE,
    phone varchar(10) not null
);

DROP TABLE IF EXISTS research_center;
CREATE TABLE research_center
(
    education_ministry_budget DECIMAL(15,2) not null,
    private_actions_budget DECIMAL(15,2) not null,
    organization_id int,
    FOREIGN KEY (organization_id) REFERENCES organizations(id) ON DELETE CASCADE,
    PRIMARY KEY (organization_id)
);

DROP TABLE IF EXISTS university;
CREATE TABLE university
(
    education_ministry_budget DECIMAL(15,2) not null,
    organization_id int,
    FOREIGN KEY (organization_id) REFERENCES organizations(id) ON DELETE CASCADE,
    PRIMARY KEY (organization_id)
);

DROP TABLE IF EXISTS company;
CREATE TABLE company
(
    own_budget DECIMAL(15,2) not null,
    organization_id int,
    FOREIGN KEY (organization_id) REFERENCES organizations(id) ON DELETE CASCADE,
    PRIMARY KEY (organization_id)
);

/* ============================
    CREATE ENTITY RELATIONS
============================ */

DROP TABLE IF EXISTS assessment;
CREATE TABLE assessment
(
    project_id int,
    FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE,
    researcher_id int,
    FOREIGN KEY (researcher_id) REFERENCES researchers(id) ON DELETE CASCADE,
	assessment_date date not null,
    grade tinyint not null,
    CONSTRAINT grade_bigger_than_zero CHECK (grade > 0),
    CONSTRAINT smaller_or_equal_to_one_hundred CHECK (grade <= 100)
);

DROP TABLE IF EXISTS project_scientific_field;
CREATE TABLE project_scientific_field
(
	field_id int,
    FOREIGN KEY (field_id) REFERENCES scientific_fields(id) ON DELETE CASCADE,
    project_id int,
    FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE
);

DROP TABLE IF EXISTS employee_relationship;
CREATE TABLE employee_relationship
(
	researcher_id int,
    FOREIGN KEY (researcher_id) REFERENCES researchers(id) ON DELETE CASCADE,
    organization_id int,
    FOREIGN KEY (organization_id) REFERENCES organizations(id) ON DELETE CASCADE,
    hire_date date not null
);

DROP TABLE IF EXISTS project_researcher_relationship;
CREATE TABLE project_researcher_relationship
(
	researcher_id int,
    FOREIGN KEY (researcher_id) REFERENCES researchers(id) ON DELETE CASCADE,
    project_id int,
    FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE
);

/* ============================
	ADD ALL FOREIGN KEYS
============================ */

ALTER TABLE deliverable
ADD project_id int,
ADD FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE;

ALTER TABLE researchers
ADD organization_id int,
ADD FOREIGN KEY (organization_id) REFERENCES organizations(id) ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE projects
ADD employee_id int,
ADD FOREIGN KEY (employee_id) REFERENCES ELIDEK_employees(id) ON DELETE RESTRICT ON UPDATE CASCADE,
ADD program_id int,
ADD FOREIGN KEY (program_id) REFERENCES programs(id) ON DELETE RESTRICT ON UPDATE CASCADE,
ADD organization_id int,
ADD FOREIGN KEY (organization_id) REFERENCES organizations(id) ON DELETE RESTRICT ON UPDATE CASCADE,
ADD scientific_director_id int,
ADD FOREIGN KEY (scientific_director_id) REFERENCES researchers(id) ON DELETE RESTRICT ON UPDATE CASCADE;

/* ================
	TRIGGERS
================ */

DELIMITER $$

CREATE TRIGGER insert_assessment BEFORE INSERT ON assessment FOR EACH ROW
BEGIN
IF EXISTS (SELECT * FROM project_researcher_relationship WHERE researcher_id = NEW.researcher_id AND project_id = NEW.project_id)
THEN SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = "A researcher cannot assess the project he works on!";
END IF;
END;$$

CREATE TRIGGER insert_project_field BEFORE INSERT ON project_scientific_field FOR EACH ROW
BEGIN
IF EXISTS (SELECT * FROM project_scientific_field WHERE field_id = NEW.field_id AND project_id = NEW.project_id)
THEN SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = "This project already covers that scientific field!";
END IF;
END;$$

CREATE TRIGGER insert_employee_relationship BEFORE INSERT ON employee_relationship FOR EACH ROW
BEGIN
IF EXISTS (SELECT * FROM employee_relationship WHERE researcher_id = NEW.researcher_id AND organization_id = NEW.organization_id)
THEN SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = "This researcher already works for that organization!";
END IF;
END;$$

CREATE TRIGGER insert_project_researcher BEFORE INSERT ON project_researcher_relationship FOR EACH ROW
BEGIN
IF EXISTS (SELECT * FROM project_researcher_relationship WHERE researcher_id = NEW.researcher_id AND project_id = NEW.project_id)
THEN SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = "This researcher already works on that project!";
END IF;
END;$$

CREATE TRIGGER b4_insert_project_researcher BEFORE INSERT ON project_researcher_relationship FOR EACH ROW
BEGIN
IF ((SELECT organization_id FROM researchers WHERE id = NEW.researcher_id) != (SELECT organization_id FROM projects WHERE id = NEW.project_id))
THEN SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = "This researcher works for another organization which doesn't handle this project!";
END IF;
END;$$

DELIMITER ;

CREATE TRIGGER after_insert_employee_relationship AFTER INSERT ON employee_relationship FOR EACH ROW
UPDATE researchers SET organization_id = NEW.organization_id WHERE id = NEW.researcher_id;