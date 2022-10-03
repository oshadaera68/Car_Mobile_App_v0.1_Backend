const express = require('express');
const mysql = require('mysql');
const dbase = require('../configs/db.configs');
const router = express.Router();
const connection = mysql.createConnection(dbase.database)

connection.connect(function (err) {
    if (err) {
        console.log(err);
    } else {
        console.log("Connected Mysql");
        var customerTable = "CREATE TABLE IF NOT EXISTS customer(id VARCHAR(255), name VARCHAR(255), address VARCHAR(255), contact VARCHAR(255))";
        connection.query(customerTable, function (err, result) {
            if (result.warningCount === 0) {
                console.log("table created");
            }
        })
    }
})

router.get('/', (req, res) => {
    var getAll = "SELECT * FROM customer";
    connection.query(getAll, (err, rows) => {
        if (err) console.log(err);
        res.send(rows)
    })
})

router.post('/', (req, res) => {
    const id = req.body.id;
    const name = req.body.name;
    const address = req.body.address;
    const contact = req.body.contact;

    var save = "INSERT INTO customer (id,name,address,contact) VALUES(?,?,?,?)";

    connection.query(save, [id, name, address, contact], err => {
        if (err) {
            res.send({ "message": "Customer Saved." })
        } else {
            res.send({ "message": "duplicate entry." })
        }
    })
})

router.put('/', (req, res) => {
    const id = req.body.id;
    const name = req.body.name;
    const address = req.body.address;
    const contact = req.body.contact;

    var update = "UPDATE customer SET name=?, address=?, contact=? WHERE id=?";

    connection.query(update, [name, address, contact, id], err, rows => {
        if (err) console.log(err);

        if (rows.affectedRows > 0) {
            res.send({ "message": "Customer is updated." })
        } else {
            res.send({ "message": "Customer is not found. try again." })
        }
    })
})

router.get('/:id', (req, res) => {
    const id = req.body.id;
    var search = "SELECT * FROM customer WHERE id=?";
    connection.query(search, [id], (err, row) => {
        if (err) console.log(err);
        res.send(row);
    })
})

router.delete('/:id', (req, res) => {
    const id = req.body.id;
    var deleteQuery = "DELETE FROM customer WHERE id=?"
    connection.query(deleteQuery, [id], err, rows => {
        if (err) console.log(err);

        if (rows.affectedRows > 0) {
            res.send({ "message": "Customer is deleted." })
        } else {
            res.send({ "message": "Customer is not found. try again." })
        }
    })
})

module.exports = router;