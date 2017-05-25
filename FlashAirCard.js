const _ = require('lodash')
const http = require('http')
var request = require('request');

function randomItem(items) {
    var index = Math.floor(Math.random() * items.length)
    return items[index]
}

var command_cgi = function(req, res, next){
    res.set({'Content-Type':'text/plain'})
    if (req.query.op == 100) {
        res.send(`WLANSD_FILELIST
${req.query.DIR},100__TSB,0,16,9944,129
${req.query.DIR},0126_1.jpg,70408,32,17071,28040
${req.query.DIR},FA000001.JPG,128751,33,17986,14713
${req.query.DIR},IMG_8451.JPG,3896830,32,19107,46329
${req.query.DIR},IMG_8460.JPG,4719991,32,19110,43959
${req.query.DIR},IMG_8461.JPG,4132281,32,19110,43964
${req.query.DIR},IMG_8462.JPG,3941257,32,19110,43970
${req.query.DIR},IMG_8463.JPG,3703502,32,19110,43995
${req.query.DIR},IMG_8464.JPG,3682800,32,19110,43995
${req.query.DIR},IMG_8465.JPG,4461456,32,19110,44005
${req.query.DIR},IMG_8466.JPG,5079378,32,19110,44019
${req.query.DIR},IMG_8467.JPG,6493943,32,19110,44027
${req.query.DIR},IMG_8468.JPG,6030726,32,19110,44033
${req.query.DIR},IMG_8469.JPG,5693572,32,19110,44050
${req.query.DIR},IMG_8470.JPG,5459600,32,19110,44058
${req.query.DIR},IMG_8474.JPG,4264053,32,19110,44096
${req.query.DIR},IMG_8475.JPG,4165510,32,19110,44096
${req.query.DIR},IMG_8478.JPG,7719614,32,19110,44119
${req.query.DIR},IMG_8479.JPG,6026397,32,19110,44122
${req.query.DIR},IMG_8480.JPG,7900514,32,19110,44139
${req.query.DIR},IMG_8481.JPG,7734962,32,19110,44140
${req.query.DIR},IMG_8482.JPG,6544432,32,19110,44146
${req.query.DIR},IMG_8483.JPG,6722098,32,19110,44151
${req.query.DIR},IMG_8484.JPG,5895979,32,19110,44165
${req.query.DIR},IMG_8485.JPG,7751671,32,19110,44176
${req.query.DIR},IMG_8486.JPG,6977303,32,19110,44181
${req.query.DIR},IMG_8487.JPG,7070755,32,19110,44233
${req.query.DIR},IMG_8488.JPG,8687179,32,19110,44239
${req.query.DIR},IMG_8489.JPG,6553179,32,19110,44240
${req.query.DIR},IMG_8490.JPG,8385326,32,19110,44241
${req.query.DIR},IMG_8491.JPG,7024460,32,19110,44297
${req.query.DIR},IMG_8492.JPG,5868533,32,19110,44302
${req.query.DIR},IMG_8493.JPG,5801286,32,19110,44308
${req.query.DIR},IMG_8494.JPG,5459763,32,19110,44312
${req.query.DIR},IMG_8495.JPG,5290554,32,19110,44312
${req.query.DIR},IMG_8496.JPG,5388903,32,19110,44313
${req.query.DIR},IMG_8497.JPG,4645747,32,19110,44320
${req.query.DIR},IMG_8498.JPG,4649973,32,19110,44320
${req.query.DIR},IMG_8499.JPG,4708843,32,19110,44320
${req.query.DIR},IMG_8500.JPG,5437723,32,19110,44332
${req.query.DIR},IMG_8501.JPG,5434868,32,19110,44332
${req.query.DIR},IMG_8502.JPG,5172675,32,19110,44334
${req.query.DIR},IMG_8503.JPG,5175547,32,19110,44334
${req.query.DIR},IMG_8504.JPG,5138737,32,19110,44335
${req.query.DIR},IMG_8505.JPG,4223447,32,19110,44342
${req.query.DIR},IMG_8506.JPG,4217074,32,19110,44342
${req.query.DIR},IMG_8507.JPG,4232374,32,19110,44342
${req.query.DIR},IMG_8508.JPG,4634729,32,19110,44347
${req.query.DIR},IMG_8509.JPG,3457427,32,19110,44357
${req.query.DIR},IMG_8510.JPG,3462469,32,19110,44362
${req.query.DIR},IMG_8511.JPG,3413260,32,19110,44364
${req.query.DIR},IMG_8512.JPG,3356615,32,19110,44365
${req.query.DIR},IMG_8513.JPG,6474848,32,19110,44425
${req.query.DIR},IMG_8514.JPG,6945174,32,19110,44430
${req.query.DIR},IMG_8515.JPG,6901188,32,19110,44430
${req.query.DIR},IMG_8516.JPG,6110574,32,19110,44434
${req.query.DIR},IMG_8517.JPG,5463456,32,19110,44449
${req.query.DIR},IMG_8518.JPG,7054390,32,19110,44453
${req.query.DIR},IMG_8519.JPG,7100943,32,19110,44455
${req.query.DIR},IMG_8520.JPG,5261084,32,19110,44534
${req.query.DIR},IMG_8521.JPG,5682276,32,19110,44537
${req.query.DIR},IMG_8522.JPG,7302837,32,19110,44538
${req.query.DIR},IMG_8523.JPG,6428284,32,19110,44539
${req.query.DIR},IMG_8524.JPG,6634737,32,19110,44605
${req.query.DIR},IMG_8525.JPG,6924303,32,19110,44608`)
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

    const width = 200
    const height = 70

    var headers = {
        'X-exif-WIDTH': width*10,
        'X-exif-HEIGHT': height*10,
        'X-exif-ORIENTATION':'0'
    }
    
    res.set(headers)
    request('https://placehold.it/'+width+'x'+height+'.jpg').pipe(res)
}

var upload_cgi = function(req, res, next) {
    res.status(501).send('Not yet implemented')
}

module.exports = {
    command_cgi,
    config_cgi,
    thumbnail_cgi
}
