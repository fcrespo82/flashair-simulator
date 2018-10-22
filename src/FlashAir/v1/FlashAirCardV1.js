const fs = require('fs')
const Config = require('./Config')
const exifParser = require('exif-parser')

module.exports = class FlashAirCardV1 {
	constructor(ssid, w_lan_mode) {
		this.config = new Config()
		this.config.Vendor.CIPATH = "/DCIM/100__TSB/FA000001.jpg"

		if (ssid) {
			this.config.Vendor.APPSSID = ssid
		} else {
			this.config.Vendor.APPSSID = 'flashair_v1_simulator'
		}
		if (!w_lan_mode) {
			this.config.Vendor.APPMODE = 4
		} else {
			this.config.Vendor.APPMODE = w_lan_mode
		}
		this.config.save()
	}

	_ok(object, headers = { 'Content-Type': 'text/plain' }) {
		return {
			status: 200,
			object: object.toString(),
			headers: headers
		}
	}
	_bad(object, headers = { 'Content-Type': 'text/plain' }) {
		return {
			status: 400,
			object: object.toString(),
			headers: headers
		}
	}
	_notImplemented(object, headers = { 'Content-Type': 'text/plain' }) {
		return {
			status: 404,
			object: object.toString(),
			headers: headers
		}
	}
	_internalError(object, headers = { 'Content-Type': 'text/plain' }) {
		return {
			status: 500,
			object: object.toString(),
			headers: headers
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

	command(num, options = null) {
		let choice = Number.parseInt(num)
		switch (choice) {
			case 100: // File list
				return this._ok('WLANSD_FILELIST\r\n' + this._filesList(options.dir).join('\r\n'))
			case 101: // File count 
				return this._ok(this._filesList(options.dir).length.toString())
			case 102: // Update status
				return this._ok(this._randomItem(['0', '1']))
			case 104: // SSID
				return this._ok(this.config.Vendor.APPSSID)
			case 105: // Network password
				return this._ok(this.networkPassword)
			case 106: // Get MAC address
				return this._ok("a41731f4d880")
			case 107: // Browser language
				return this._ok(options.language)
			case 108: // Firmware
				return this._ok("F24BAW3AW1.00.00")
			case 120:
				return this._ok(this.config.Vendor.CID.toString())
			default:
				return this._notImplemented('Not Implemented Yet or not available in this firmware version')
		}
	}

	_filesList(dir) {
		const items = fs.readdirSync('./sdcard/' + dir)
		var files = items.map(function (item) {
			var tipo = 0
			let stat = fs.statSync('./sdcard/' + dir + "/" + item)
			if (stat.isDirectory()) {
				tipo = 16
			} else if (stat.isFile()) {
				tipo = 32
			}
			let date = stat.ctimeMs
			let dateS = this._encodeDate(new Date(date))
			let timeS = this._encodeTime(new Date(date))
			return `.${dir},${item},${stat.size},${tipo},${dateS},${timeS}`
		}, this);
		return files
	}

	photo(path) {
		const image = path
		try {
			var buffer = fs.readFileSync('./sdcard/' + image)
			var headers = {
				'Content-Type': 'image/jpeg'
			}
			return this._ok(buffer, headers)
		} catch (error) {
			return this._internalError()
		}
	}

	thumbnail(path) {
		try {
			var buffer = fs.readFileSync('./sdcard/' + path)
			var parser = exifParser.create(buffer);
			var result = parser.parse();

			var headers = {
				'Content-Type': 'image/jpeg',
				'X-exif-WIDTH': result.imageSize.width,
				'X-exif-HEIGHT': result.imageSize.height,
				'X-exif-ORIENTATION': result.tags.Orientation ? result.tags.Orientation : 1
			}

			return this._ok(result.getThumbnailBuffer(), headers)
		} catch (error) {
			return this._internalError()
		}
	}
}