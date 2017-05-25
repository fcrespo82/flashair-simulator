const express = require('express')

module.exports = function(server) {

    server.route('/command.cgi').get(function(req, res, next){
        res.set({'Content-Type':'text/plain'})
        if (req.query.op == 100) {
            
            res.send(`WLANSD_FILELIST
<directory>,<filename>,<size>,<attribute>,<date>,<time>
${req.query.DIR},100__TSB,0,16,9944,129
${req.query.DIR},0126_1.jpg,70408,32,17071,28040`)
            
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
            res.send('/DCIM/100__TSB/FA000001.JPG')
        } else if (req.query.op == 110) {
            var options = [0,2,3,4,5,6]
            var index = Math.floor(Math.random() * options.length)
            res.send(options[index].toString())
        } else if (req.query.op == 111) {
            res.send('300000')
        } else if (req.query.op == 117) {
            res.send('0123ABCD4567EFGH')
        } else if (req.query.op == 118) {
            var options = [0,1]
            var index = Math.floor(Math.random() * options.length)
            res.send(options[index].toString())
        } else if (req.query.op == 120) {
            res.send('02544d535730384708c00b78700d201')
        } else if (req.query.op == 121) {
            res.send('174428')
        } else if (req.query.op == 130) {
            res.status(400).send('Not yet implemented')
        } else if (req.query.op == 131) {
            res.status(400).send('Not yet implemented')
        } else if (req.query.op == 140) {
            res.send('13952920/15228928,512')
        } else if (req.query.op == 190) {
            res.status(400).send('Not yet implemented')
        } else if (req.query.op == 200) {
            var options = [[200, 'OK'],[400, 'Bad Request']]
            var index = Math.floor(Math.random() * options.length)
            res.status(options[index][0]).send(options[index][1])
        }  else if (req.query.op == 201) {
            var options = [[200, 'OK'],[400, 'Bad Request']]
            var index = Math.floor(Math.random() * options.length)
            res.status(options[index][0]).send(options[index][1])
        } else if (req.query.op == 202) {
            var options = ['SHAREMODE','NORMALMODE']
            var index = Math.floor(Math.random() * options.length)
            res.send(options[index].toString())
        }
        
        
    })

}