const _ = require('lodash')
const http = require('http')
const request = require('request');
const fs = require('fs')

function randomItem(items) {
    var index = Math.floor(Math.random() * items.length)
    return items[index]
}

var command_cgi = function(req, res, next){
    res.set({'Content-Type':'text/plain'})
    if (req.query.op == 100) {
        const items = fs.readdirSync('./sdcard/' + req.query.DIR)
        var files = items.map(function(item) {
            return `.${req.query.DIR},${item},0,16,994,129`
        }, this);
        res.send(`WLANSD_FILELIST\r` + files.join('\r'))
    } else if (req.query.op == 101 ) {
        res.send('100')
    } else if (req.query.op == 102) {
        res.send('0')
    } else if (req.query.op == 104) {
        res.send('flashair_simulator')
    } else if (req.query.op == 105) {
        res.send('12345678')
    } else if (req.query.op == 106) {
        res.send('a41731f4d880')
    } else if (req.query.op == 107) {
        res.send(req.headers["accept-language"])
    } else if (req.query.op == 108) {
        res.send('F19BAW3AW2.00.00')
    } else if (req.query.op == 109) {
        res.send('${req.query.DIR}/FA000001.JPG')
    } else if (req.query.op == 110) {
        var item = randomItem(['0','2','3','4','5','6'])
        res.send(item)
    } else if (req.query.op == 111) {
        res.send('300000')
    } else if (req.query.op == 117) {
        res.send('0123ABCD4567EFGH')
    } else if (req.query.op == 118) {
        var item = randomItem(['0','1'])
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
        var item = randomItem([[200, 'OK'],[400, 'Bad Request']])
        res.status(item[0]).send(item[1])
    }  else if (req.query.op == 201) {
        var item = randomItem([[200, 'OK'],[400, 'Bad Request']])
        res.status(item[0]).send(item[1])
    } else if (req.query.op == 202) {
        var item = randomItem(['SHAREMODE','NORMALMODE'])
        res.send(item)
    } else if (req.query.op == 203) {
        res.send('photoshare_simulator')
    } else if (req.query.op == 220) {
        var item = randomItem(['0','1','2'])
        res.send(item)
    } else if (req.query.op == 221) {
        var item = randomItem(_.range(-48,54))
        res.send(item.toString())
    }
}

var config_cgi = function(req, res, next) {
    res.set({'Content-Type':'text/plain'})
    if (!req.query.MASTERCODE || req.query.MASTERCODE.length != 12) {
        res.status(500).send('ERROR')
    } else {
        res.status(200).send('SUCCESS')
    }
}

var thumbnail_cgi = function(req, res, next) {
    res.set({'Content-Type':'image/jpeg'})
    const image = req._parsedUrl.query

    try {
        
        var buffer = fs.readFileSync('./sdcard/' + image)

        var parser = require('exif-parser').create(buffer);
        var result = parser.parse();

        var headers = {
            'X-exif-WIDTH': result.imageSize.width,
            'X-exif-HEIGHT': result.imageSize.height,
            'X-exif-ORIENTATION': result.tags.Orientation ? result.tags.Orientation : 0
        }

        res.set(headers)

        res.send(result.getThumbnailBuffer())
    } catch (error) {
        res.send()    
    }
}

var upload_cgi = function(req, res, next) {
    res.status(501).send('Not yet implemented')
}

var photos = function(req, res, next) {
    res.set({'Content-Type':'image/jpeg'})
    const image = req._parsedUrl.path
    try {
        var buffer = fs.readFileSync('./sdcard/' + image)
        res.send(buffer)
    } catch (error) {
        res.send()    
    }

}

module.exports = {
    command_cgi,
    config_cgi,
    thumbnail_cgi,
    upload_cgi,
    photos
}
