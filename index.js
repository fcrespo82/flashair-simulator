const port = 3003

const bodyParser = require('body-parser')
const express = require('express')
const server = express()
const flashair = require('./flashair')(server)

server.use(bodyParser.json())

server.listen(port, function() {
    console.log(`FlashAir Simulator is running on port ${port}.`)
})

module.exports = server