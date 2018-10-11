const FlashAirCardV1 = require('./FlashAirCardV1')

module.exports = class FlashAirCardV2 extends FlashAirCardV1 {
	constructor(ssid) {
		if (ssid) {
			super(ssid)
		} else {
			super('flashair_v2_simulator')
		}
	}

	operation(num, options) {
		let choice = Number.parseInt(num)
		switch (choice) {
			case 201:
				return this._randomItem([this._ok('OK'), this._bad('400 Bad Request')])
			default:
				return super.operation(num, options)
		}
	}

}