const express = require('express')
const user = require('./routes/user')
const app = express()
const port = 4000

app.use(express.json())

app.use('/user',user)

app.listen(port, ()=>{
    console.log(`app listening port ${port}`);
})
