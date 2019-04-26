const fs = require('fs')
const ini = require('ini')

module.exports = class Config {

	constructor(path) {
		if (path) {
			this.PATH = path
		} else {
			this.PATH = './sdcard/CONFIG'
		}
		this.config = ini.parse(fs.readFileSync(this.PATH, 'utf-8'))
	}

	save() {
		fs.writeFileSync('./sdcard/CONFIG', ini.stringify(this.config))
	}

	get Vendor() {
		return this.config.Vendor
	}

	get WLANSD() {
		return this.config.WLANSD
	}
}