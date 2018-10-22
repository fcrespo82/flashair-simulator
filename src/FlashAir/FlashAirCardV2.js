const FlashAirCardV1 = require('../v1/FlashAirCardV1')

module.exports = class FlashAirCardV2 extends FlashAirCardV1 {
	constructor(ssid, w_lan_mode) {
		if (ssid) {
			super(ssid, w_lan_mode)
		} else {
			super('flashair_v2_simulator', w_lan_mode)
		}
	}

	operation(num, options) {
		let choice = Number.parseInt(num)
		switch (choice) {
			case 108:
				return this._ok("F19BAW3AW2.00.00")
			case 201:
				return this._randomItem([this._ok('OK'), this._bad('400 Bad Request')])
			default:
				return super.operation(num, options)
		}
	}

}