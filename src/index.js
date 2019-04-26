const port = 3003

const bodyParser = require('body-parser')
const server = require('express')()
const flashAir = require('./FlashAir')(server, 1)

flashAir.use(bodyParser.json())

flashAir.listen(port, function() {
    console.log(`FlashAir Simulator is running on port ${port}.`)
})
