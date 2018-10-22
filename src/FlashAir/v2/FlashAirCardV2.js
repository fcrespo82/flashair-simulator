const FlashAirCardV1 = require('../v1/FlashAirCardV1')

module.exports = class FlashAirCardV2 extends FlashAirCardV1 {
	constructor(ssid, w_lan_mode) {
		if (ssid) {
			super(ssid, w_lan_mode)
		} else {
			super('flashair_v2_simulator', w_lan_mode)
		}
		this.startDate = new Date()
	}

	command(num, options) {
		let choice = Number.parseInt(num)
		switch (choice) {
			case 108: // Firmware
				return this._ok("F19BAW3AW2.00.00")
			case 109: // Control image
				return this._ok(this.config.Vendor.CIPATH)
			case 110: // Wireless LAN Mode
				return this._ok(this.config.Vendor.APPMODE)
			case 110:
				return this._ok(this.config.Vendor.APPAUTOTIME)
			case 117:
				return this._ok(this.config.Vendor.APPINFO)
			case 118:
				return this._ok(this.config.Vendor.UPLOAD)
			case 121:
				return this._ok(new Date() - this.startDate)
			case 201:
				return this._randomItem([this._ok('OK'), this._bad('400 Bad Request')])
			case 201:
				return this._randomItem([this._ok('OK'), this._bad('400 Bad Request')])
			default:
				return super.operation(num, options)
		}
	}

}