import fs from 'fs';
import _ from 'lodash';
import exifParser from 'exif-parser';
import Config from '../Config';
import AbstractFlashAirCard, { FlashAirParameters } from '../AbstractFlashAirCard';

export default class FlashAirCardV1 extends AbstractFlashAirCard {
	firmware: string
	networkPassword: string = ""

	constructor(parameters?: FlashAirParameters) {
		super()
		this.config = new Config()
		this.config.Vendor.CIPATH = "/DCIM/100__TSB/FA000001.jpg"
		this.firmware = "F24BAW3AW1.00.00"

		if (parameters && parameters.ssid) {
			this.config.Vendor.APPSSID = parameters.ssid
		} else {
			this.config.Vendor.APPSSID = 'flashair_v1_simulator'
		}
		if (parameters && parameters.w_lan_mode) {
			this.config.Vendor.APPMODE = parameters.w_lan_mode
		} else {
			this.config.Vendor.APPMODE = 4
		}
		this.config.save()
	}

	commands_enabled() {
		var commands = _.range(100, 103)
		commands = commands.concat(_.range(104, 109))
		return commands
	}

	exec_command(operation: number, parameters: any | null = null) {
		switch (operation) {
			case 100: // File list
				return this._ok('WLANSD_FILELIST\r\n' + this._filesList(parameters.dir).join('\r\n'))
			case 101: // File count 
				return this._ok(this._filesList(parameters.dir).length.toString())
			case 102: // Update status
				return this._ok(this._randomItem(['0', '1']))
			case 104: // SSID
				return this._ok(this.config.Vendor.APPSSID)
			case 105: // Network password
				return this._ok(this.networkPassword)
			case 106: // Get MAC address
				return this._ok("a41731f4d880")
			case 107: // Browser language
				return this._ok(parameters.language)
			case 108: // Firmware
				return this._ok(this.firmware)
			case 120:
				return this._ok(this.config.Vendor.CID.toString())
			default:
				return this._notImplemented('Not Implemented Yet or not available in this firmware version')
		}
	}

	photo(path: string) {
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

	thumbnail(path: string) {
		try {
			var buffer = fs.readFileSync('./sdcard/' + path);
			var parser = exifParser.create(buffer);
			var result = parser.parse();

			var headers = {
				'Content-Type': 'image/jpeg'
			}

			return this._ok(result.getThumbnailBuffer(), headers);
		} catch (error) {
			return this._internalError();
		}
	}

	exec_config(query: any) {
		let error = this._validate_config(query)
		if (error) {
			return error
		} else {
			if (query.APPINFO) {
				this.config.Vendor.APPINFO = query.APPINFO
			}
			if (query.APPMODE) {
				this.config.Vendor.APPMODE = query.APPMODE
			}
			if (query.APPNETWORKKEY) {
				this.config.Vendor.APPNETWORKKEY = query.APPNETWORKKEY
			}
			if (query.APPSSID) {
				this.config.Vendor.APPSSID = query.APPSSID
			}
			if (query.CIPATH) {
				this.config.Vendor.CIPATH = query.CIPATH
			}
			this.config.save()
			return this._ok("SUCCESS")
		}
	}
}