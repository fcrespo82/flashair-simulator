const fs = require('fs')
const exifParser = require('exif-parser')
const FlashAirCardV2 = require('../v2/FlashAirCardV2')

module.exports = class FlashAirCardV3 extends FlashAirCardV2 {
	constructor(ssid, w_lan_mode) {
		if (ssid) {
			super(ssid, w_lan_mode)
		} else {
			super('flashair_v3_simulator', w_lan_mode)
		}
		this.firmware = "F24BAW3AW3.00.00"
		this.web_dav = 0
	}

	command(num, options) {
		let choice = Number.parseInt(num)
		switch (choice) {
			case 108: // Firmware
				return this._ok("F19BAW3AW2.00.00")
			case 220:
				return this._ok(this.web_dav)
			case 221: // Timezone
				return this._ok(this.config.Vendor.TIMEZONE)
			default:
				return super.command(num, options)
		}
	}

	thumbnail(path) {
		try {
			var buffer = fs.readFileSync('./sdcard/' + path);
			var parser = exifParser.create(buffer);
			var result = parser.parse();

			var headers = {
				'Content-Type': 'image/jpeg',
				'X-exif-WIDTH': result.imageSize.width,
				'X-exif-HEIGHT': result.imageSize.height,
				'X-exif-ORIENTATION': result.tags.Orientation ? result.tags.Orientation : 1
			}

			return this._ok(result.getThumbnailBuffer(), headers);
		} catch (error) {
			return this._internalError();
		}
	}

	exec_config(query) {
		let error = this._validate_config(query)
		if (error) {
			return error
		} else {
			if (query.TIMEZONE) {
				this.config.Vendor.TIMEZONE = query.TIMEZONE
			}
			this.config.save()
			return this._ok("SUCCESS")
		}
	}

}