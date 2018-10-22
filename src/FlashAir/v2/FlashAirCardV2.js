const FlashAirCardV1 = require('../v1/FlashAirCardV1')

module.exports = class FlashAirCardV2 extends FlashAirCardV1 {
	constructor(ssid, w_lan_mode) {
		if (ssid) {
			super(ssid, w_lan_mode)
		} else {
			super('flashair_v2_simulator', w_lan_mode)
		}
		this.startDate = new Date()
		this.share_mode = undefined
	}

	command(num, options) {
		let choice = Number.parseInt(num)
		switch (choice) {
			case 108: // Firmware
				return this._ok("F19BAW3AW2.00.00")
			case 109: // Control image
				return this._ok(this.config.Vendor.CIPATH.toString())
			case 110: // Wireless LAN Mode
				return this._ok(this.config.Vendor.APPMODE.toString())
			case 110:
				return this._ok(this.config.Vendor.APPAUTOTIME.toString())
			case 117:
				return this._ok(this.config.Vendor.APPINFO.toString())
			case 118:
				return this._ok(this.config.Vendor.UPLOAD.toString())
			case 121:
				return this._ok((new Date() - this.startDate).toString())
			case 200:
				if (this.share_mode === 'SHAREMODE') {
					return this._bad('400 Bad Request')
				} else {
					this.share_mode = 'SHAREMODE'
					return this._ok('OK')
				}
			case 201:
				if (this.share_mode === 'NORMALMODE') {
					return this._bad('400 Bad Request')
				} else {
					this.share_mode = 'NORMALMODE'
					return this._ok('OK')
				}
			case 202:
				if (!this.share_mode) {
					return this._bad('400 Bad Request')
				} else {
					return this._ok(this.share_mode)
				}
			case 203: // Photoshare SSID
				return this._ok("photoshare_e8e0b756a7fb")
			default:
				return super.command(num, options)
		}
	}

}