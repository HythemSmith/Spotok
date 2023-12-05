const express = require('express')
const app = express()
const db = require('./database/db.js')
const bodyParser = require('body-parser')
const route = require('./routes/index.js')

// Connect to database
db.connect()
app.use(bodyParser.json())
// Route init
route(app)


app.listen(3000, () => console.log("Server is started"))