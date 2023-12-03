const express = require('express')
const app = express()
const db = require('./database/db.js')

db.connect()

app.listen(3000, () => console.log("Server is started"))