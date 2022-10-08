const express = require('express');
const router = express.Router()
const mysql = require('mysql')
const db = require('../configs/db.configs')

const connection = mysql.createConnection(db.database)

connection.connect(function (err) {
    if (err) {
        console.log(err);
    } else {
        var vehicleTable = "CREATE TABLE IF NOT EXISTS vehicle(code VARCHAR(255)PRIMARY KEY, type VARCHAR(255), brand VARCHAR(255), price DOUBLE)";
        connection.query(vehicleTable, function (err, result) {
            if (result.warningCount === 0) {
                console.log("table created");
            }
        })
    }
})

router.get('/', (req, res) => {
    var getAllVehicle = "SELECT * FROM vehicle";
    connection.query(getAllVehicle, (err, rows) => {
        if (err) console.log(err);
        res.send(rows)
    })
})

router.post('/', (req, res) => {
    const code = req.body.code;
    const type = req.body.type;
    const brand = req.body.brand;
    const price = req.body.price;

    var saveUser = "INSERT INTO vehicle(code,type,brand,price) VALUES(?,?,?,?)";

    connection.query(saveUser, [code,type,brand,price], (err) => {
        if (err) {
            res.send({ "message": "vehicle saved" })
        } else {
            res.send({ "message": "duplicate entry" })
        }
    })
})

router.put('/', (req, res) => {
    const code = req.body.code;
    const type = req.body.type;
    const brand = req.body.brand;
    const price = req.body.price;

    var updateVehicle = "UPDATE user SET type=?, brand=?, price=? WHERE code=?";
    connection.query(updateVehicle, [ type, brand, price, code], (err) => {
        if (err) {
            res.send({ "message": "vehicle updated" })
        } else {
            res.send({ "message": "vehicle is not found. try again..." })
        }
    })
})

router.get('/:id', (req, res) => {
    const code = req.body.code;
    var searchVehicle = "SELECT * FROM vehicle WHERE code=?";
    connection.query(searchVehicle, [code], (err, rows) => {
        if (err) console.log(err);
        res.send(rows);
    })
})

router.delete('/:id', (req, res) => {
    const code = req.body.code;
    var deleteVehicle = "DELETE FROM vehicle WHERE code=?";
    connection.query(deleteVehicle, [code], (err, rows) => {
        if (err) console.log(err);
        if (rows.affectedRows > 0) {
            res.send({ "message": "vehicle deleted" })
        } else {
            res.send({ "message": "vehicle is not found. try again..." })
        }
    })
})

module.exports = router