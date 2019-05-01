import path from 'path';
import bodyParser from 'body-parser';
import server from 'express';

const port = 3003
const app = server()
app.set('view engine', 'pug')
app.set('views', path.join(__dirname + '/FlashAir/views'))

app.use(function (_, res, next) {
    res.locals._ = require('lodash');
    next();
});

import flashAir from './FlashAir'
const flashAirCard = flashAir(app, { version: 1 })
flashAirCard.use(bodyParser.json())
flashAirCard.listen(port, function () {
    console.log(`FlashAir Simulator is running on port ${port}.`)
})
