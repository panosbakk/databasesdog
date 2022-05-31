const { pool } = require('../utils/database');

/* Controller to retrieve grades from database */
exports.getProjects = (req, res, next) => {

     /* check for messages in order to show them when rendering the page */
    let messages = req.flash("messages");
    if (messages.length == 0) messages = [];

    /* create the connection, execute query, render data */
    pool.getConnection((err, conn) => {
        
        conn.promise().query('SELECT * FROM project_info')
        .then(([rows, fields]) => {
            res.render('projects.ejs', {
                pageTitle: "Projects Page",
                projects: rows,
                messages: messages
            })
        })
        .then(() => pool.releaseConnection(conn))
        .catch(err => console.log(err))
    })

}

/* Controller to delete grade by ID from database */
exports.getSelectResearcherProject = (req, res, next) => {
    /* get id from params */
    const id = req.params.id;
    let messages = req.flash("messages");
    if (messages.length == 0) messages = [];
    /* create the connection, execute query, flash respective message and redirect to grades route */
    pool.getConnection((err, conn) => {
        var sqlQuery = (`SELECT DISTINCT researchers.id, CONCAT(first_name, ' ', last_name) as full_name, TIMESTAMPDIFF(year, researchers.birth_date, CURRENT_DATE()) as age, sex
        FROM researchers
        INNER JOIN project_researcher_relationship ON project_researcher_relationship.researcher_id = id
        INNER JOIN projects ON project_researcher_relationship.project_id = projects.id
        WHERE projects.id = ${id}`);

        conn.promise().query(sqlQuery)
        .then(([rows, fields]) => {
            res.render('show-researchers.ejs', {
                pageTitle: "Researchers Page",
                researchers: rows,
                messages: messages
            })
        })
        .then(() => pool.releaseConnection(conn))
        .catch(err => console.log(err))
    })

}

exports.postProject = (req, res, next) => {

    /* get necessary data sent */
    const title = req.body.title;
    const summary = req.body.summary;
    const budget = req.body.budget;
    /* create the connection, execute query, flash respective message and redirect to grades route */
    pool.getConnection((err, conn) => {
        var sqlQuery = `INSERT INTO projects(title, summary, budget) VALUES(${title}, ${summary}, ${budget})`;

        conn.promise().query(sqlQuery, [title, summary, budget])
        .then(() => {
            pool.releaseConnection(conn);
            req.flash('messages', { type: 'success', value: "Successfully added a new Project!" })
            res.redirect('/');
        })
        .catch(err => {
            req.flash('messages', { type: 'error', value: "Something went wrong, Project could not be added." })
            res.redirect('/');
        })
    })
}

exports.getSearchProject = (req, res, next) => {
    /* get necessary data sent */
    const date = req.body.date;
    const duration = req.body.duration;
    const employee_id = req.body.employee_id;

    let messages = req.flash("messages");
    if (messages.length == 0) messages = [];
    
    /* create the connection, execute query, flash respective message and redirect to projects route */
    pool.getConnection((err, conn) => {
        var sqlQuery = (`SELECT * FROM project_info WHERE starting_date = ? OR duration = ?  OR employee_id = ?`, date, duration, employee_id);

        conn.promise().query(sqlQuery, [date, duration, ELIDEK_employee])
        .then(([rows, fields]) => {
            res.render('by-category.ejs', {
                pageTitle: "Project Search Page",
                projects: rows,
                messages: messages
            })
        })
        .then(() => {
            pool.releaseConnection(conn);
        })
        .catch(err => console.log(err))
    })
}

exports.postUpdateProject = (req, res, next) => {

    /* get necessary data sent */
    const id = req.body.id;
    const title = req.body.title;
    const summary = req.body.summary;
    const budget = req.body.budget;

    /* create the connection, execute query, flash respective message and redirect to grades route */
    pool.getConnection((err, conn) => {
        var sqlQuery = `UPDATE projects SET title = ?, summary = ?, budget = ? WHERE id = ${id}`;

        conn.promise().query(sqlQuery, [title, summary, budget])
        .then(() => {
            pool.releaseConnection(conn);
            req.flash('messages', { type: 'success', value: "Successfully updated project!" })
            res.redirect('/projects');
        })
        .catch(err => {
            req.flash('messages', { type: 'error', value: "Something went wrong, Project could not be updated." })
            res.redirect('/projects');
        })
    })
}

