const { pool } = require('../utils/database');

exports.getFifthQuery = (req, res, next) => {
    let messages = req.flash("messages");
    if (messages.length == 0) messages = [];
    
    
    pool.getConnection((err, conn) => {
        var sqlQuery = (`SELECT DISTINCT field_pair, COUNT(field_pair) AS sum
        FROM
        (SELECT CONCAT(A.field_id, ' ', B.field_id) AS field_pair, A.project_id
        FROM project_scientific_field A, project_scientific_field B
        WHERE A.field_id != B.field_id AND A.project_id = B.project_id
        ORDER BY A.project_id) AS kekw
        WHERE field_pair LIKE '1_2' OR field_pair LIKE '1_3' OR field_pair LIKE '1_4' OR field_pair LIKE '2_3' OR field_pair LIKE '2_4' OR field_pair LIKE '3_4'
        GROUP BY kekw.field_pair
        ORDER BY sum DESC, field_pair ASC
        LIMIT 3`);

        conn.promise().query(sqlQuery)
        .then(([rows, fields]) => {
            res.render('fifthquery.ejs', {
                pageTitle: "Fields Page",
                fields: rows,
                messages: messages
            })
        })
        .then(() => pool.releaseConnection(conn))
        .catch(err => console.log(err))
    })

}