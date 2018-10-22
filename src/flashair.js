const express = require('express')
const _ = require('lodash')
const FlashAirCard = require('./FlashAirCard')

module.exports = function(server) {

    server.route('/command.cgi').get(FlashAirCard.command_cgi)

    server.route('/config.cgi').get(FlashAirCard.config_cgi)

    server.route('/thumbnail.cgi').get(FlashAirCard.thumbnail_cgi)

    server.route('/upload.cgi').get(FlashAirCard.upload_cgi)

    server.route('/*').get(FlashAirCard.photos)

}
