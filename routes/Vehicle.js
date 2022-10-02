const express = require('express')
const mysql = require('mysql')
const dbase = require('../configs/db.configs')
const router = express.Router();
const connection = mysql.createConnection(dbase.database) 

connection.connect(function(err){
    if(err){
        console.log(err);
    }else{
        console.log("Connected mysql");
        var vehicleTable = "CREATE TABLE IF NOT EXISTS vehicle (code VARCHAR(255) PRIMARY KEY, type VARCHAR(255), brand VARCHAR(255), unitPrice DOUBLE)"
        connection.query(vehicleTable, function(err,result){
            if(result.warningCount===0){
                console.log("table created");
            }
        })
    }
})

router.get('/',(req,res)=>{
    var getAll = "SELECT * FROM vehicle";
    connection.query(getAll,(err,rows){
        
    })
})