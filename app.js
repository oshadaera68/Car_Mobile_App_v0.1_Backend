const express = require('express')
const vehicle = require('./routes/vehicle')
const customer = require('./routes/customer')
const app = express()
const port = 4000

app.use(express.json())

app.use('./vehicle', vehicle)
app.use('/customer', customer)

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })