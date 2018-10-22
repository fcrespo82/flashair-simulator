const fs = require('fs')

module.exports = class FlashAirCardV1 {
	constructor(ssid, w_lan_mode) {
		this.config = new CONFIG()
		
		if (ssid) {
			this.config.APPSSID = ssid
			this.config.CIPATH = "/DCIM/100__TSB/FA000001.jpg"
			if (!w_lan_mode) {
				this.config.APPMODE = 4
			} else {
				this.config.APPMODE = w_lan_mode
			}
		} else {
			this.config.APPSSID = 'flashair_v1_simulator'
		}

		this.write_CONFIG(this.config)
	}

	write_CONFIG(config) {
		config.Vendor.CIPATH = this.CIPATH
		config.Vendor.APPMODE = this.wirelessLanMode

		config.save()
	}

	_ok(object) {
		return {
			status: 200,
			object: object
		}
	}
	_bad(object) {
		return {
			status: 400,
			object: object
		}
	}
	_notImplemented(object) {
		return {
			status: 404,
			object: object
		}
	}
	_internalError(object) {
		return {
			status: 500,
			object: object
		}
	}

	_randomItem(items) {
		var index = Math.floor(Math.random() * items.length)
		return items[index]
	}

	_encodeDate(date) {
		let year = date.getFullYear() - 1980
		let month = date.getMonth() + 1
		let day = date.getDate()
		return (year << 9) + (month << 5) + day
	}
	_encodeTime(date) {
		let hour = date.getHours()
		let minutes = date.getMinutes()
		let seconds = date.getSeconds()
		return (hour << 11) + (minutes << 5) + (seconds * 2)
	}

	operation(num, options) {
		let choice = Number.parseInt(num)
		switch (choice) {
			case 100: // File list
				return this._ok('WLANSD_FILELIST\r\n' + this.filesList(options).join('\r\n'))
			case 101: // File count 
				return this._ok(this.filesList(options).length.toString())
			case 102: // Update status
				return this._ok(this._randomItem(['0', '1']))
			case 104: // SSID
				return this._ok(this.APPSSID)
			case 105: // Network password
				return this._ok(this.networkPassword)
			case 106: // Get MAC address
				return this._ok("a41731f4d880")
			case 107: // Browser language
				return this._ok(options.language)
			case 108: // Firmware
				return this._ok("F24BAW3AW1.00.00")
			case 109: // Control image
				return this._ok(this.CIPATH)
			default:
				return this._notImplemented('Not Implemented Yet')
		}
	}

	filesList(options) {
		const items = fs.readdirSync('./sdcard/' + options.dir)
		var files = items.map(function (item) {
			var tipo = 0
			let stat = fs.statSync('./sdcard/' + options.dir + "/" + item)
			if (stat.isDirectory()) {
				tipo = 16
			} else if (stat.isFile()) {
				tipo = 32
			}
			let date = stat.ctimeMs
			let dateS = this._encodeDate(new Date(date))
			let timeS = this._encodeTime(new Date(date))
			return `.${options.dir},${item},${stat.size},${tipo},${dateS},${timeS}`
		}, this);
		return files
	}

	photo(options) {
		const image = options.path
		try {
			var buffer = fs.readFileSync('./sdcard/' + image)
			return this._ok(buffer)
		} catch (error) {
			return this._internalError()
		}
	}
}