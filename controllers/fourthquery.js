const { pool } = require('../utils/database');

exports.getFourthQuery = (req, res, next) => {
    let messages = req.flash("messages");
    if (messages.length == 0) messages = [];
    
    
    pool.getConnection((err, conn) => {
        var sqlQuery = (`SELECT l.organization_id, l.org_name, l.projects_number
        FROM (
        SELECT DISTINCT
        A.organization_id, org_name, COUNT(A.id) AS projects_number, A.starting_date
        FROM projects A
        INNER JOIN organizations ON A.organization_id = organizations.id
        WHERE EXISTS (
            SELECT 1 FROM projects B
            INNER JOIN organizations ON B.organization_id = organizations.id
            WHERE B.organization_id = A.organization_id
            AND year(A.starting_date) = year(B.starting_date) + 1
        )
        GROUP BY A.organization_id
        HAVING COUNT(A.id) >= 1
        ORDER BY COUNT(A.id) DESC
        ) AS l JOIN (
        SELECT DISTINCT
        A.organization_id, org_name, COUNT(A.id) AS projects_number, A.starting_date
        FROM projects A
        INNER JOIN organizations ON A.organization_id = organizations.id
        WHERE EXISTS (
            SELECT 1 FROM projects B
            INNER JOIN organizations ON B.organization_id = organizations.id
            WHERE B.organization_id = A.organization_id
            AND year(B.starting_date) = year(A.starting_date) + 1
        )
        GROUP BY A.organization_id
        HAVING COUNT(A.id) >= 1
        ORDER BY COUNT(A.id) DESC
        ) AS m ON l.organization_id = m.organization_id
        WHERE l.projects_number = m.projects_number
        GROUP BY l.organization_id
        ORDER BY l.projects_number DESC`);

        conn.promise().query(sqlQuery)
        .then(([rows, fields]) => {
            res.render('fourthquery.ejs', {
                pageTitle: "Organizations Page",
                results: rows,
                messages: messages
            })
        })
        .then(() => pool.releaseConnection(conn))
        .catch(err => console.log(err))
    })

}