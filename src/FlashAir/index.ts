import cardV1 from './v1/FlashAirCardV1';
import cardV2 from './v2/FlashAirCardV2';
import cardV3 from './v3/FlashAirCardV3';
import { Application } from 'express';
import AbstractFlashAirCard from './AbstractFlashAirCard';

export enum FlashAirVersion {
	V1,
	V2,
	V3
}

const server = function (expressServer: Application, version: FlashAirVersion, parameters: any = null) {
	let card: AbstractFlashAirCard
	switch (version) {
		case FlashAirVersion.V1:
			card = new cardV1(parameters.ssid, parameters.w_lan_mode)
			break;
		case FlashAirVersion.V2:
			card = new cardV2(parameters.ssid, parameters.w_lan_mode)
			break;
		case FlashAirVersion.V3:
			card = new cardV3(parameters.ssid, parameters.w_lan_mode)
			break;
		default:
			break;
	}

	/**
	 *  Prepare the parameters to be sent to the card
	 * @param req 
	 * @param res 
	 * @param next 
	 */
	//@ts-ignore
	private function command_cgi(req, res, next) {

		let parameters;
		if (req.query.op == 100) {
			parameters = { dir: req.query.DIR }
		} else if (req.query.op == 101) {
			parameters = { dir: req.query.DIR }
		} else if (req.query.op == 102) {
			// no parameters
		} else if (req.query.op == 104) {
			// no parameters
		} else if (req.query.op == 105) {
			// no parameters
		} else if (req.query.op == 106) {
			// no parameters
		} else if (req.query.op == 107) {
			parameters = { language: req.headers["accept-language"] }
		} else if (req.query.op == 108) {
			// no parameters
		} else if (req.query.op == 109) {
			// no parameters
		} else if (req.query.op == 130) {
			parameters = {
				addr: req.query.addr,
				len: req.query.len
			}
		} else if (req.query.op == 131) {
			parameters = {
				addr: req.query.addr,
				len: req.query.len,
				data: req.query.data
			}
		}

		const option = parseInt(req.query.op)
		let response = card.exec_command(option, parameters)
		res.set(response.headers).status(response.status).send(response.object)
	}

	//@ts-ignore
	private function config_cgi(req, res, next) {
		let response = card.exec_config(req.query)
		res.set(response.headers).status(response.status).send(response.object)
	}

	//@ts-ignore
	private function thumbnail_cgi(req, res, next) {
		const image = req._parsedUrl.query
		let response = card.thumbnail(image)
		res.set(response.headers)
		res.status(response.status).send(response.object)
	}

	//@ts-ignore
	private function upload_cgi(req, res, next) {
		res.status(501).send('Not yet implemented')
	}

	//@ts-ignore
	private function photos(req, res, next) {
		let response = card.photo(req._parsedUrl.path)
		res.set(response.headers)
		res.status(response.status).send(response.object)
	}

	//@ts-ignore
	private function simulator(req, res, next) {
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

export default server