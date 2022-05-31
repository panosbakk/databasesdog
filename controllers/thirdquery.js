const { pool } = require('../utils/database');

exports.getProjectsScFi = (req, res, next) => {

    const id = req.params.id;

   let messages = req.flash("messages");
    if (messages.length == 0) messages = [];
    /* create the connection, execute query, flash respective message and redirect to grades route */
    pool.getConnection((err, conn) => {
        conn.promise().query(`SELECT project_researcher_relationship.project_id, projects.title, project_researcher_relationship.researcher_id,
        CONCAT(first_name, '', last_name) as full_name
        FROM projects
        INNER JOIN project_researcher_relationship ON project_researcher_relationship.project_id = projects.id
        INNER JOIN researchers ON project_researcher_relationship.researcher_id = researchers.id
        INNER JOIN project_scientific_field ON project_scientific_field.project_id = projects.id
        INNER JOIN scientific_fields ON project_scientific_field.field_id = scientific_fields.id
        WHERE scientific_fields.id = ${id} AND projects.end_date = null`)
        .then(([rows, fields]) => {
            res.render('thirdquery.ejs', {
                pageTitle: "Researchers Page",
                thirdquerys: rows,
                messages: messages
            })
        })
        .then(() => pool.releaseConnection(conn))
        .catch(err => console.log(err))
    })
}