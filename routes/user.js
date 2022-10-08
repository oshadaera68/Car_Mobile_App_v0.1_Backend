const express = require('express');
const app = express()
const router = express.Router()
const mysql = require('mysql')
const db = require('../configs/db.configs')

const connection = mysql.createConnection(db.database)

connection.connect(function (err) {
    if (err) {
        console.log(err);
    } else {
        console.log("connected");
        var userTable = "CREATE TABLE IF NOT EXISTS user(id VARCHAR(255)PRIMARY KEY,name VARCHAR(255),contactNo VARCHAR(15),email VARCHAR(255),password VARCHAR(255))";
        connection.query(userTable, function (err, result) {
            if (result.warningCount === 0) {
                console.log('table created');
            }
        })
    }
})

router.get('/', (req, res) => {
    var getAllUser = "SELECT * FROM user";
    connection.query(getAllUser, (err, rows) => {
        if (err) console.log(err);
        res.send(rows)
    })
})

router.post('/', (req, res) => {
    const id = req.body.id;
    const name = req.body.name;
    const contactNo = req.body.contactNo;
    const email = req.body.email;
    const password = req.body.password;

    var saveUser = "INSERT INTO user(id,name,contactNo,email,password) VALUES(?,?,?,?,?)";

    connection.query(saveUser, [id, name, contactNo, email, password], (err) => {
        if (err) {
            res.send({ "message": "user saved" })
        } else {
            res.send({ "message": "duplicate entry" })
        }
    })
})

router.put('/', (req, res) => {
    const id = req.body.id;
    const name = req.body.name;
    const contactNo = req.body.contactNo;
    const email = req.body.email;
    const password = req.body.password;

    var updateUser = "UPDATE user SET name=?, contactNo=?, email=?, password=? WHERE id=?";
    connection.query(updateUser, [name, contactNo, email, password, id], (err) => {
        if (err) {
            res.send({ "message": "user updated" })
        } else {
            res.send({ "message": "user is not found. try again..." })
        }
    })
})

router.get('/:id', (req, res) => {
    const id = req.body.id;
    var searchUser = "SELECT * FROM user WHERE id=?";
    connection.query(searchUser, [id], (err, row) => {
        if (err) console.log(err);
        res.send(row);
    })
})

router.delete('/:id', (req, res) => {
    const id = req.body.id;
    var deleteUser = "DELETE FROM user WHERE id=?";
    connection.query(deleteUser, [id], (err, row) => {
        if (err) console.log(err);
        if (row.affectedRows > 0) {
            res.send({ "message": "user deleted" })
        } else {
            res.send({ "message": "user is not found. try again..." })
        }
    })
})

module.exports = router