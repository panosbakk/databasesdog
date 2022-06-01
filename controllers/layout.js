const { pool } = require('../utils/database');

/* Controller to render data shown in landing page */
exports.getLanding = (req, res, next) => {

    /* check for messages in order to show them when rendering the page */
    let messages = req.flash("messages");
    if (messages.length == 0) messages = [];
    /* create the connection */
    pool.getConnection((err, conn) => {

        /* when queries promises finish render respective data */
            res.render('landing.ejs', {
                pageTitle: "Home page",
                messages
            })
    })
}

/* Controller to render data shown in create student page */
exports.getCreateProgram = (req, res, next) => {
    res.render('create_program.ejs', {
        pageTitle: "Program Creation Page"
    })
}

exports.getCreateResearcher = (req, res, next) => {
    res.render('create_researcher.ejs', {
        pageTitle: "Researcher Creation Page"
    })
}

exports.getCreateProject = (req, res, next) => {
    res.render('create_project.ejs', {
        pageTitle: "Project Creation Page"
    })
}

