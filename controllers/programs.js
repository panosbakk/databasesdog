const { pool } = require('../utils/database');

/* Controller to retrieve students from database */
exports.getPrograms = (req, res, next) => {

    /* check for messages in order to show them when rendering the page */
    let messages = req.flash("messages");
    if (messages.length == 0) messages = [];

    /* create the connection, execute query, render data */
    pool.getConnection((err, conn) => {
        
        conn.promise().query('SELECT * FROM programs')
        .then(([rows, fields]) => {
            res.render('programs.ejs', {
                pageTitle: "Programs Page",
                programs: rows,
                messages: messages
            })
        })
        .then(() => pool.releaseConnection(conn))
        .catch(err => console.log(err))
    })

}

/* Controller to create a new program in the database */
exports.postProgram = (req, res, next) => {

    /* get necessary data sent */
    const prog_name = req.body.prog_name;
    const prog_address = req.body.prog_address;

    /* create the connection, execute query, flash respective message and redirect to grades route */
    pool.getConnection((err, conn) => {
        var sqlQuery = `INSERT INTO programs(prog_name, prog_address) VALUES(?, ?)`;

        conn.promise().query(sqlQuery, [prog_name, prog_address])
        .then(() => {
            pool.releaseConnection(conn);
            req.flash('messages', { type: 'success', value: "Successfully added a new Program!" })
            res.redirect('/');
        })
        .catch(err => {
            req.flash('messages', { type: 'error', value: "Something went wrong, Program could not be added." })
            res.redirect('/');
        })
    })
}

/* Controller to update a program in the database */
exports.postUpdateProgram = (req, res, next) => {

    /* get necessary data sent */
    const id = req.body.id;
    const prog_name = req.body.prog_name;
    const prog_address = req.body.prog_address;

    /* create the connection, execute query, flash respective message and redirect to grades route */
    pool.getConnection((err, conn) => {
        var sqlQuery = `UPDATE programs SET prog_name = ?, prog_address = ? WHERE id = ${id}`;

        conn.promise().query(sqlQuery, [prog_name, prog_address])
        .then(() => {
            pool.releaseConnection(conn);
            req.flash('messages', { type: 'success', value: "Successfully updated program!" })
            res.redirect('/programs');
        })
        .catch(err => {
            req.flash('messages', { type: 'error', value: "Something went wrong, Program could not be updated." })
            res.redirect('/programs');
        })
    })
}

exports.postDeleteProgram = (req, res, next) => {
    /* get id from params */
    const id = req.params.id;
    
    /* create the connection, execute query, flash respective message and redirect to grades route */
    pool.getConnection((err, conn) => {
        var sqlQuery = `DELETE FROM programs WHERE id = ${id}`;

        conn.promise().query(sqlQuery)
        .then(() => {
            pool.releaseConnection(conn);
            req.flash('messages', { type: 'success', value: "Successfully deleted program!" })
            res.redirect('/programs');
        })
        .catch(err => {
            req.flash('messages', { type: 'error', value: "Something went wrong, Program could not be deleted." })
            res.redirect('/programs');
        })
    })

}