import fs from 'fs';
import Config from './Config';

export class FlashAirResponse {
	status: number = 200
	object: any
	headers: any
}

export interface FlashAirParameters {
	ssid?: string
	w_lan_mode?: number
}

export default abstract class AbstractFlashAirCard {
	config!: Config
	abstract exec_command(_op: any, _parameters: any | undefined): FlashAirResponse
	abstract exec_config(_query: any): FlashAirResponse
	abstract thumbnail(_image: any): FlashAirResponse
	abstract photo(_path: any): FlashAirResponse

	_ok(object: any = null, headers = { 'Content-Type': 'text/plain' }): FlashAirResponse {
		return {
			status: 200,
			object: object,
			headers: headers
		}
	}
	_bad(object: any = null, headers = { 'Content-Type': 'text/plain' }): FlashAirResponse {
		return {
			status: 400,
			object: object,
			headers: headers
		}
	}
	_notImplemented(object: any = null, headers = { 'Content-Type': 'text/plain' }): FlashAirResponse {
		return {
			status: 404,
			object: object,
			headers: headers
		}
	}
	_internalError(object: any = null, headers = { 'Content-Type': 'text/plain' }): FlashAirResponse {
		return {
			status: 500,
			object: object,
			headers: headers
		}
	}

	_randomItem(items: any[]): any {
		var index = Math.floor(Math.random() * items.length)
		return items[index]
	}

	_encodeDate(date: Date) {
		let year = date.getFullYear() - 1980
		let month = date.getMonth() + 1
		let day = date.getDate()
		return (year << 9) + (month << 5) + day
	}
	_encodeTime(date: Date) {
		let hour = date.getHours()
		let minutes = date.getMinutes()
		let seconds = date.getSeconds()
		return (hour << 11) + (minutes << 5) + (seconds * 2)
	}

	_filesList(dir: string): string[] {
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
			// @ts-ignore
			const flashAirCard: AbstractFlashAirCard = this;
			let dateS = flashAirCard._encodeDate(new Date(date))
			let timeS = flashAirCard._encodeTime(new Date(date))
			return `.${dir},${item},${stat.size},${tipo},${dateS},${timeS}`
		}, this);
		return files
	}
	_validate_config(query: any): FlashAirResponse {
		if (!query.MASTERCODE || query.MASTERCODE.length != 12) {
			return this._internalError("ERROR")
		}
		return this._ok()
	}
}