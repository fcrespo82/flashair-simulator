const _ = require('lodash')
const http = require('http')
const request = require('request');
const fs = require('fs')
const exifParser = require('exif-parser')
const FlashAirCard = require('./FlashAir/v2/FlashAirCardV2')

let card = new FlashAirCard()

function randomItem(items) {
    var index = Math.floor(Math.random() * items.length)
    return items[index]
}

var command_cgi = function (req, res, next) {
    res.set({ 'Content-Type': 'text/plain' })

    if (req.query.op == 100) {
        let response = card.operation(req.query.op, { dir: req.query.DIR })
        res.status(response.status).send(response.object)
    } else if (req.query.op == 101) {
        let response = card.operation(req.query.op, { dir: req.query.DIR })
        res.status(response.status).send(response.object)
    } else if (req.query.op == 102) {
        let response = card.operation(req.query.op, { dir: req.query.DIR })
        res.status(response.status).send(response.object)
    } else if (req.query.op == 104) {
        let response = card.operation(req.query.op, { dir: req.query.DIR })
        res.status(response.status).send(response.object)
    } else if (req.query.op == 105) {
        let response = card.operation(req.query.op, { dir: req.query.DIR })
        res.status(response.status).send(response.object)
    } else if (req.query.op == 106) {
        let response = card.operation(req.query.op)
        res.status(response.status).send(response.object)
    } else if (req.query.op == 107) {
        let response = card.operation(req.query.op, { language: req.headers["accept-language"] })
        res.status(response.status).send(response.object)
    } else if (req.query.op == 108) {
        let response = card.operation(req.query.op, { dir: req.query.DIR })
        res.status(response.status).send(response.object)
    } else if (req.query.op == 109) {
        let response = card.operation(req.query.op)
        res.status(response.status).send(response.object)
    } else if (req.query.op == 110) {
        var item = randomItem(['0', '2', '3', '4', '5', '6'])
        res.send(item)
    } else if (req.query.op == 111) {
        res.send('300000')
    } else if (req.query.op == 117) {
        res.send('0123ABCD4567EFGH')
    } else if (req.query.op == 118) {
        var item = randomItem(['0', '1'])
        res.send(item)
    } else if (req.query.op == 120) {
        res.send('02544d535730384708c00b78700d201')
    } else if (req.query.op == 121) {
        res.send('174428')
    } else if (req.query.op == 130) {
        res.status(501).send('Not yet implemented')
    } else if (req.query.op == 131) {
        res.status(501).send('Not yet implemented')
    } else if (req.query.op == 140) {
        res.send('13952920/15228928,512')
    } else if (req.query.op == 190) {
        res.status(501).send('Not yet implemented')
    } else if (req.query.op == 200) {
        var item = randomItem([[200, 'OK'], [400, 'Bad Request']])
        res.status(item[0]).send(item[1])
    } else if (req.query.op == 201) {
        let response = card.operation(req.query.op, { dir: req.query.DIR })
        res.status(response.status).send(response.response)
    } else if (req.query.op == 202) {
        var item = randomItem(['SHAREMODE', 'NORMALMODE'])
        res.send(item)
    } else if (req.query.op == 203) {
        res.send('photoshare_simulator')
    } else if (req.query.op == 220) {
        var item = randomItem(['0', '1', '2'])
        res.send(item)
    } else if (req.query.op == 221) {
        var item = randomItem(_.range(-48, 54))
        res.send(item.toString())
    }
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
    res.set({ 'Content-Type': 'image/jpeg' })
    const image = req._parsedUrl.query

    try {

        var buffer = fs.readFileSync('./sdcard/' + image)
        var parser = exifParser.create(buffer);
        var result = parser.parse();

        var headers = {
            'X-exif-WIDTH': result.imageSize.width,
            'X-exif-HEIGHT': result.imageSize.height,
            'X-exif-ORIENTATION': result.tags.Orientation ? result.tags.Orientation : 1
        }

        res.set(headers)

        res.send(result.getThumbnailBuffer())
    } catch (error) {
        res.status(500).send('Internal Error')
    }
}

var upload_cgi = function (req, res, next) {
    res.status(501).send('Not yet implemented')
}

var photos = function (req, res, next) {
    res.set({ 'Content-Type': 'image/jpeg' })
    let response = card.photo({ path: req._parsedUrl.path })
    console.log(response)
    res.status(response.status).send(response.object)
    // const image = req._parsedUrl.path
    // try {
    //     var buffer = fs.readFileSync('./sdcard/' + image)
    //     res.send(buffer)
    // } catch (error) {
    //     res.send()
    // }

}

module.exports = {
    command_cgi,
    config_cgi,
    thumbnail_cgi,
    upload_cgi,
    photos
}