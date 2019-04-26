// @ts-check

const path = require('path');

const version = require('./Version')
const cardV1 = require('./v1/FlashAirCardV1')
const cardV2 = require('./v2/FlashAirCardV2')
const cardV3 = require('./v3/FlashAirCardV3')
module.exports = function (expressServer, options) {
    let card = null
    switch (options.version) {
        case version.V1:
            card = new cardV1(options.ssid, options.w_lan_mode)
            break;
        case version.V2:
            card = new cardV2(options.ssid, options.w_lan_mode)
            break;
        case version.V3:
            card = new cardV3(options.ssid, options.w_lan_mode)
            break;

        default:
            break;
    }


    var command_cgi = function (req, res, next) {

        let options;
        if (req.query.op == 100) {
            options = { dir: req.query.DIR }
        } else if (req.query.op == 101) {
            options = { dir: req.query.DIR }
        } else if (req.query.op == 102) {
            // no options
        } else if (req.query.op == 104) {
            // no options
        } else if (req.query.op == 105) {
            // no options
        } else if (req.query.op == 106) {
            // no options
        } else if (req.query.op == 107) {
            options = { language: req.headers["accept-language"] }
        } else if (req.query.op == 108) {
            // no options
        } else if (req.query.op == 109) {
            // no options
        }

        let response = card.command(req.query.op, options)
        res.set(response.headers).status(response.status).send(response.object)


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

    const photos = function (req, res, next) {
        let response = card.photo(req._parsedUrl.path)
        res.set(response.headers)
        res.status(response.status).send(response.object)
    }

    const simulator = function (req, res, next) {
        res.render('index', { ssid: card.config.Vendor.APPSSID, version: card.constructor.name, card: card })
    }

    expressServer.route('/command.cgi').get(command_cgi)

    expressServer.route('/config.cgi').get(config_cgi)

    expressServer.route('/thumbnail.cgi').get(thumbnail_cgi)

    expressServer.route('/upload.cgi').get(upload_cgi)

    expressServer.route('/simulator').get(simulator)

    expressServer.route('/*').get(photos)


    return expressServer
}

