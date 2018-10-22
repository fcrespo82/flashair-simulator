const _ = require('lodash')
const fs = require('fs')
const exifParser = require('exif-parser')
const { cardV1, cardV2 } = require('./FlashAir/index')

let card = new cardV2()

function randomItem(items) {
    var index = Math.floor(Math.random() * items.length)
    return items[index]
}

var command_cgi = function (req, res, next) {

    let options;
    if (req.query.op == 100) {
        options = { dir: req.query.DIR }
    } else if (req.query.op == 101) {
        options = { dir: req.query.DIR }
    } else if (req.query.op == 102) {
        options = { dir: req.query.DIR }
    } else if (req.query.op == 104) {
        options = { dir: req.query.DIR }
    } else if (req.query.op == 105) {
        options = { dir: req.query.DIR }
    } else if (req.query.op == 106) {
        // pass
    } else if (req.query.op == 107) {
        options = { language: req.headers["accept-language"] }
    } else if (req.query.op == 108) {
        options = { dir: req.query.DIR }
    } else if (req.query.op == 109) {
        // pass
    } 

    let response = card.command(req.query.op, options)
    res.set(response.headers).status(response.status).send(response.object)
    
    
    // } else if (req.query.op == 110) {
    //     var item = randomItem(['0', '2', '3', '4', '5', '6'])
    //     res.send(item)
    // } else if (req.query.op == 111) {
    //     res.send('300000')
    // } else if (req.query.op == 117) {
    //     res.send('0123ABCD4567EFGH')
    // } else if (req.query.op == 118) {
    //     var item = randomItem(['0', '1'])
    //     res.send(item)
    // } else if (req.query.op == 120) {
    //     res.send('02544d535730384708c00b78700d201')
    // } else if (req.query.op == 121) {
    //     res.send('174428')
    // } else if (req.query.op == 130) {
    //     res.status(501).send('Not yet implemented')
    // } else if (req.query.op == 131) {
    //     res.status(501).send('Not yet implemented')
    // } else if (req.query.op == 140) {
    //     res.send('13952920/15228928,512')
    // } else if (req.query.op == 190) {
    //     res.status(501).send('Not yet implemented')
    // } else if (req.query.op == 200) {
    //     var item = randomItem([[200, 'OK'], [400, 'Bad Request']])
    //     res.status(item[0]).send(item[1])
    // } else if (req.query.op == 201) {
    //     let response = card.command(req.query.op, { dir: req.query.DIR })
    //     res.status(response.status).send(response.response)
    // } else if (req.query.op == 202) {
    //     var item = randomItem(['SHAREMODE', 'NORMALMODE'])
    //     res.send(item)
    // } else if (req.query.op == 203) {
    //     res.send('photoshare_simulator')
    // } else if (req.query.op == 220) {
    //     var item = randomItem(['0', '1', '2'])
    //     res.send(item)
    // } else if (req.query.op == 221) {
    //     var item = randomItem(_.range(-48, 54))
    //     res.send(item.toString())
    // }
}

var config_cgi = function (req, res, next) {
    res.set({ 'Content-Type': 'text/plain' })
    if (!req.query.MASTERCODE || req.query.MASTERCODE.length != 12) {
        res.status(500).send('ERROR')
    } else {
        res.status(200).send('SUCCESS')
    }
}

var thumbnail_cgi = function (req, res, next) {
    const image = req._parsedUrl.query
    let response = card.thumbnail(image)
    res.set(response.headers)
    res.status(response.status).send(response.object)

}

var upload_cgi = function (req, res, next) {
    res.status(501).send('Not yet implemented')
}

var photos = function (req, res, next) {
    let response = card.photo(req._parsedUrl.path)
    res.set(response.headers)
    res.status(response.status).send(response.object)
}

module.exports = {
    command_cgi,
    config_cgi,
    thumbnail_cgi,
    upload_cgi,
    photos
}
