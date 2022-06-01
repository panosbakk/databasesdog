let faker = require('faker');
var fs = require('fs');

/* PROJECTS */
DUMMY_PROJECTS_DATA_NUMBER = 50;
TABLE_NAME = "projects";
TABLE_COLUMNS = ["title", "summary", "budget", "starting_date", "end_date"];
let content = "";

for (i = 0; i < DUMMY_PROJECTS_DATA_NUMBER; i++) {
    title = faker.random.word();
    summary = faker.lorem.sentences(3);
    budget = faker.datatype.float({ max: 1000000.00 , min: 100000.00 , precision: 0.01});
    if (i % 2 == 0) {
      starting_date = faker.date.past(2, '2021-05-31T00:00:00.000Z').toISOString();
      end_date = faker.date.future(1, '2022-05-31T00:00:00.000Z').toISOString();
    } else {
      starting_date = faker.date.past(1, '2022-05-31T00:00:00.000Z').toISOString();
      end_date = null;
    }
    content += "INSERT INTO " + TABLE_NAME + " (" + TABLE_COLUMNS.join(",") + ') VALUES ("' +
    title + '","' + summary + '","' + budget + '","' + starting_date + '","' + end_date + '");\n';
}

fs.writeFile('dummy_data_' + TABLE_NAME + '.txt', content, (err) => {
  if (err) throw err;
  console.log('File is created successfully.');
});

/* PROGRAMS */
DUMMY_PROGRAMS_DATA_NUMBER = 30;
TABLE_NAME = "programs";
TABLE_COLUMNS = ["prog_name", "prog_address"];
content = "";

for (i = 0; i < DUMMY_PROGRAMS_DATA_NUMBER; i++) {
  prog_name = faker.random.word();
  prog_address = faker.name.findName();
  content += "INSERT INTO " + TABLE_NAME + " (" + TABLE_COLUMNS.join(",") + ') VALUES ("' +
  prog_name + '","' + prog_address + '");\n';
}

fs.writeFile('dummy_data_' + TABLE_NAME + '.txt', content, (err) => {
  if (err) throw err;
  console.log('File is created successfully.');
});

/* ORGANIZATIONS */
DUMMY_ORGANIZATIONS_DATA_NUMBER = 30;
TABLE_NAME = "organizations";
TABLE_COLUMNS = ["org_name", "abbreviation", "street", "street_number", "postal_code", "city"];
content = "";

for (i = 0; i < DUMMY_ORGANIZATIONS_DATA_NUMBER; i++) {
  org_name = faker.random.word();
  abbreviation = org_name.slice(0,4);
  street = faker.address.streetName();
  street_number = faker.datatype.number(100);
  postal_code = faker.address.zipCode('#####');
  city = faker.address.city();
  if (((i+1) % 3 ) == 0) {
  type = "research_center";
  } 
  else if (((i+1) % 3 ) == 1) {
    type = "university";
  }
  else {
    type = "company";
  }
  content += "INSERT INTO " + TABLE_NAME + " (" + TABLE_COLUMNS.join(",") + ') VALUES ("' +
  org_name + '","' + abbreviation + '","' + street + '","' + street_number + '","' + postal_code + '","' + city + '");\n';
  content += "INSERT INTO " + type + " (organization_id) VALUES (" + (i+1) + ');\n';
}

fs.writeFile('dummy_data_' + TABLE_NAME + '.txt', content, (err) => {
  if (err) throw err;
  console.log('File is created successfully.');
});

/* RESEARCHERS */
DUMMY_RESEARCHERS_DATA_NUMBER = 100;
TABLE_NAME = "researchers";
TABLE_COLUMNS = ["first_name", "last_name", "sex", "birth_date"];
content = "";

for (i = 0; i < DUMMY_RESEARCHERS_DATA_NUMBER; i++) {
  sex = faker.name.gender(true);
  first_name = faker.name.firstName(sex);
  last_name = faker.name.lastName(sex);
  birth_date = faker.date.past(50, '2000-01-01T00:00:00.000Z').toISOString();
  content += "INSERT INTO " + TABLE_NAME + " (" + TABLE_COLUMNS.join(",") + ') VALUES ("' +
  first_name + '","' + last_name + '","' + sex + '","' + birth_date + '");\n';
}

fs.writeFile('dummy_data_' + TABLE_NAME + '.txt', content, (err) => {
  if (err) throw err;
  console.log('File is created successfully.');
});

/* ELIDEK EMPLOYEES */
DUMMY_EMPLOYEES_DATA_NUMBER = 25;
TABLE_NAME = "ELIDEK_employees";
TABLE_COLUMNS = ["emp_name"];
content = "";

for (i = 0; i < DUMMY_EMPLOYEES_DATA_NUMBER; i++) {
  emp_name = faker.name.findName();
  content += "INSERT INTO " + TABLE_NAME + " (" + TABLE_COLUMNS.join(",") + ') VALUES ("' +
  emp_name + '");\n';
}

fs.writeFile('dummy_data_' + TABLE_NAME + '.txt', content, (err) => {
  if (err) throw err;
  console.log('File is created successfully.');
});

/* DELIVERABLES */
DUMMY_DELIVERABLES_DATA_NUMBER = faker.datatype.number({ min: 10, max: 30});
TABLE_NAME = "deliverable";
TABLE_COLUMNS = ["title", "summary", "delivery_date", "project_id"];
content = "";

for (i = 0; i < DUMMY_DELIVERABLES_DATA_NUMBER; i++) {
  title = faker.random.word();
  summary = faker.lorem.sentences(3);
  delivery_date = faker.date.between('2022-06-01T00:00:00.000Z', '2023-05-18T00:00:00.000Z').toISOString();
  project_id = faker.datatype.number({ min: 1, max: 50});
  content += "INSERT INTO " + TABLE_NAME + " (" + TABLE_COLUMNS.join(",") + ') VALUES ("' +
  title + '","' + summary + '","' + delivery_date + '","' + project_id + '");\n';
}

fs.writeFile('dummy_data_' + TABLE_NAME + '.txt', content, (err) => {
  if (err) throw err;
  console.log('File is created successfully.');
});

/* PHONES */
DUMMY_PHONES_DATA_NUMBER = 200;
TABLE_NAME = "phones";
TABLE_COLUMNS = ["organization_id", "phone"];
content = "";

for (i = 0; i < DUMMY_PHONES_DATA_NUMBER; i++) {
  organization_id = faker.datatype.number({ min: 1, max: DUMMY_ORGANIZATIONS_DATA_NUMBER});
  phone = faker.phone.phoneNumber('210#######');
  content += "INSERT INTO " + TABLE_NAME + " (" + TABLE_COLUMNS.join(",") + ') VALUES ("' +
  organization_id + '","' + phone + '");\n';
}

fs.writeFile('dummy_data_' + TABLE_NAME + '.txt', content, (err) => {
  if (err) throw err;
  console.log('File is created successfully.');
});

/* ASSESSMENT */
DUMMY_PROJECTS_DATA_NUMBER = 50;
TABLE_NAME = "assessment";
TABLE_COLUMNS = ["project_id", "researcher_id", "assessment_date", "grade"];
content = "";

for (i = 0; i < DUMMY_PROJECTS_DATA_NUMBER; i++) {
  project_id = i + 1;
  researcher_id = faker.datatype.number({ min: 1, max: 100});
  assessment_date = faker.date.past(1, '2022-05-31T00:00:00.000Z').toISOString();
  grade = faker.datatype.number({ min: 1, max: 100});
  content += "INSERT INTO " + TABLE_NAME + " (" + TABLE_COLUMNS.join(",") + ') VALUES ("' +
  project_id + '","' + researcher_id + '","' + assessment_date + '","' + grade + '");\n';
}

fs.writeFile('dummy_data_' + TABLE_NAME + '.txt', content, (err) => {
  if (err) throw err;
  console.log('File is created successfully.');
});

/* PROJECT-FIELDS */
DUMMY_PROJECTS_DATA_NUMBER = 50;
TABLE_NAME = "project_scientific_field";
TABLE_COLUMNS = ["project_id", "field_id"];
content = "";

for (i = 0; i < DUMMY_PROJECTS_DATA_NUMBER; i++) {
  project_id = i + 1;
  randomNumber = faker.datatype.number({ min: 1, max: 4});
  for (j = 0; j < randomNumber; j++) {
  field_id = faker.datatype.number({ min: 1, max: 4}); 
  content += "INSERT INTO " + TABLE_NAME + " (" + TABLE_COLUMNS.join(",") + ') VALUES ("' +
  project_id + '","' + field_id + '");\n';
  }
}

fs.writeFile('dummy_data_' + TABLE_NAME + '.txt', content, (err) => {
  if (err) throw err;
  console.log('File is created successfully.');
});

/* EMPLOYEE RELATIONSHIP */
DUMMY_RESEARCHERS_DATA_NUMBER = 100;
TABLE_NAME = "employee_relationship";
TABLE_COLUMNS = ["researcher_id", "organization_id", "hire_date"];
content = "";

for (i = 0; i < DUMMY_RESEARCHERS_DATA_NUMBER; i++) {
  researcher_id = i + 1;
  organization_id = i % 30 + 1;
  hire_date = faker.date.past(3, '2018-05-18T00:00:00.000Z').toISOString();
  content += "INSERT INTO " + TABLE_NAME + " (" + TABLE_COLUMNS.join(",") + ') VALUES ("' +
  researcher_id + '","' + organization_id + '","' + hire_date + '");\n';
}

fs.writeFile('dummy_data_' + TABLE_NAME + '.txt', content, (err) => {
  if (err) throw err;
  console.log('File is created successfully.');
});

/* PROJECT-RESEARCHER RELATIONSHIP */
DUMMY_RESEARCHERS_DATA_NUMBER = 100;
TABLE_NAME = "project_researcher_relationship";
TABLE_COLUMNS = ["researcher_id", "project_id"];
content = "";

for (i = 0; i < DUMMY_RESEARCHERS_DATA_NUMBER; i++) {
  researcher_id = i + 1;
  project_id = i % 30 + 1;
  hire_date = faker.date.past(4, '2021-05-18T00:00:00.000Z').toISOString();
  content += "INSERT INTO " + TABLE_NAME + " (" + TABLE_COLUMNS.join(",") + ') VALUES ("' +
  researcher_id + '","' + project_id + '");\n';
}

fs.writeFile('dummy_data_' + TABLE_NAME + '.txt', content, (err) => {
  if (err) throw err;
  console.log('File is created successfully.');
});


/* UPDATES */
DUMMY_PROJECTS_DATA_NUMBER = 50;
TABLE_NAME = "projects";
TABLE_COLUMNS = ["employee_id", "organization_id"];
content = "";

for (i = 0; i < DUMMY_PROJECTS_DATA_NUMBER; i++) {
  project_id = i + 1;
  employee_id = i % DUMMY_EMPLOYEES_DATA_NUMBER + 1;
  organization_id = i % 30 + 1;
  content += "UPDATE projects SET employee_id = " +
  employee_id + " , organization_id = " + organization_id + " WHERE id = " + project_id + ';\n';
}

fs.writeFile('dummy_data_updates.txt', content, (err) => {
  if (err) throw err;
  console.log('File is created successfully.');
});