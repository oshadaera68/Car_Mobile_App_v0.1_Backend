const express = require('express')
const mysql = require('mysql')
const db = require('../configs/db.configs')
const router = express.Router()
const connection = mysql.createConnection(db.database)

connection.connect(function (err) {
    if (err) {
        console.log(err);
    } else {
        var login = "CREATE TABLE IF NOT EXISTS login (username VARCHAR(255)PRIMARY KEY, password VARCHAR(255))";
        connection.query(login, function (err, result) {
            if (result.warningCount === 0) {
                console.log("table created");
            }
        })
    }
})

router.post('/', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    var saveLogin = "INSERT INTO login (username,password) VALUES (?,?)";
    connection.query(saveLogin, [username, password], (err) => {
        if (err) {
            res.send({
                "status": "200",
                "message": "User saved..."
            })
        } else {
            res.send({
                "status":"500",
                "message":"User already exists..."
            })
        }
    })
})

module.exports = router