const { pool } = require('../utils/database');

exports.getEmployees = (req, res, next) => {
    let messages = req.flash("messages");
    if (messages.length == 0) messages = [];
    /* create the connection, execute query, flash respective message and redirect to grades route */
    pool.getConnection((err, conn) => {
        conn.promise().query(`SELECT emp_name, org_name AS company_name, SUM(projects.budget) AS total_finance
        FROM ELIDEK_employees
        INNER JOIN projects ON ELIDEK_employees.project_id = projects.id
        INNER JOIN organizations ON projects.organization_id = organizations.id
        INNER JOIN company ON company.organization_id = organizations.id
        GROUP BY organizations.id
        ORDER BY total_finance DESC
        LIMIT 5`)
        .then(([rows, fields]) => {
            res.render('employees.ejs', {
                pageTitle: "Employees Page",
                ELIDEK_employees: rows,
                messages: messages
            })
        })
        .then(() => pool.releaseConnection(conn))
        .catch(err => console.log(err))
    })
}