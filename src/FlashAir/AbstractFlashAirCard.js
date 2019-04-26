const fs = require('fs')

module.exports = class AbstractFlashAirCard {
	_ok(object, headers = { 'Content-Type': 'text/plain' }) {
		return {
			status: 200,
			object: object,
			headers: headers
		}
	}
	_bad(object, headers = { 'Content-Type': 'text/plain' }) {
		return {
			status: 400,
			object: object,
			headers: headers
		}
	}
	_notImplemented(object, headers = { 'Content-Type': 'text/plain' }) {
		return {
			status: 404,
			object: object,
			headers: headers
		}
	}
	_internalError(object, headers = { 'Content-Type': 'text/plain' }) {
		return {
			status: 500,
			object: object,
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
}