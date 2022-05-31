const { pool } = require('../utils/database');

exports.getyoungResearchers = (req, res, next) => {
    let messages = req.flash("messages");
    if (messages.length == 0) messages = [];
    /* create the connection, execute query, flash respective message and redirect to grades route */
    pool.getConnection((err, conn) => {
        conn.promise().query(`SELECT DISTINCT
        CONCAT(first_name, ' ', last_name) AS full_name,
        COUNT(project_researcher_relationship.project_id) AS projects_number
        FROM researchers
        INNER JOIN project_researcher_relationship ON project_researcher_relationship.researcher_id = researchers.id
        INNER JOIN projects ON project_researcher_relationship.project_id = projects.id
        WHERE TIMESTAMPDIFF(year, researchers.birth_date, CURRENT_DATE()) < 40
        GROUP BY researchers.id
        ORDER BY projects_number`)
        .then(([rows, fields]) => {
            res.render('researchers.ejs', {
                pageTitle: "Researchers Page",
                researchers: rows,
                messages: messages
            })
        })
        .then(() => pool.releaseConnection(conn))
        .catch(err => console.log(err))
    })
}

/*
exports.getLastQuery = (req, res, next) => {
    let messages = req.flash("messages");
    if (messages.length == 0) messages = [];
    
    
    pool.getConnection((err, conn) => {
        var sqlQuery = (`SELECT DISTINCT
        CONCAT(first_name, ' ', last_name) AS full_name,
        COUNT(project_researcher_relationship.project_id) AS projects_number
        FROM researchers
        INNER JOIN project_researcher_relationship ON project_researcher_relationship.researcher_id = researchers.id
        INNER JOIN projects ON project_researcher_relationship.project_id = projects.id
        INNER JOIN deliverable ON deliverable.project_id = projects.id
        WHERE deliverable.project_id != project_researcher_relationship.project_id
        GROUP BY researchers.id
        HAVING COUNT(project_researcher_relationship.project_id) >= 5`);

        conn.promise().query(sqlQuery)
        .then(([rows, fields]) => {
            res.render('researchers.ejs', {
                pageTitle: "Researchers Page",
                researchers: rows,
                messages: messages
            })
        })
        .then(() => pool.releaseConnection(conn))
        .catch(err => console.log(err))
    })

}
*/