const express = require('express')
const user = require('./routes/user')
const vehicle = require('./routes/vehicle')
const login = require('./routes/login')
const app = express()
const port = 4000

app.use(express.json())

app.use('/user',user)
app.use('/vehicle',vehicle)
app.use('/login',login)

app.listen(port, ()=>{
    console.log(`app listening port ${port}`);
})
