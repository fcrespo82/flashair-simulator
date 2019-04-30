import path from 'path';
const port = 3003
import bodyParser from 'body-parser';
import server from 'express';

const app = server()
app.set('view engine', 'pug')
app.set('views', path.join(__dirname + '/FlashAir/views'))

app.use(function (_, res, next) {
    res.locals._ = require('lodash');
    next();
});

const flashAir = require('./FlashAir')(app, { version: 1 })
flashAir.use(bodyParser.json())
flashAir.listen(port, function () {
    console.log(`FlashAir Simulator is running on port ${port}.`)
})
