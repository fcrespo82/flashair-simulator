const path = require('path')
const port = 3003
const bodyParser = require('body-parser')
const server = require('express')()
server.set('view engine', 'pug')
server.set('views', path.join(__dirname + '/FlashAir/views'))
server.use(function(req, res, next){
    res.locals._ = require('lodash');
    next();
});
  
const flashAir = require('./FlashAir')(server, { version: 2 })
flashAir.use(bodyParser.json())
flashAir.listen(port, function () {
    console.log(`FlashAir Simulator is running on port ${port}.`)
})
