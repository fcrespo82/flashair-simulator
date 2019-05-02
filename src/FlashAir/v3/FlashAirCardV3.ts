import fs from 'fs';
import exifParser from 'exif-parser';
import FlashAirCardV2 from '../v2/FlashAirCardV2';

export default class FlashAirCardV3 extends FlashAirCardV2 {
	web_dav: number
	constructor(ssid: string, w_lan_mode: number) {
		if (ssid) {
			super(ssid, w_lan_mode)
		} else {
			super('flashair_v3_simulator', w_lan_mode)
		}
		this.firmware = "F24BAW3AW3.00.00"
		this.web_dav = 0
	}

	exec_command(operation: number, parameters: any) {
		switch (operation) {
			case 108: // Firmware
				return this._ok("F19BAW3AW2.00.00")
			case 220:
				return this._ok(this.web_dav)
			case 221: // Timezone
				return this._ok(this.config.Vendor.TIMEZONE)
			default:
				return super.exec_command(operation, parameters)
		}
	}

	thumbnail(path: string) {
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

	exec_config(query: any) {
		let error = this._validate_config(query)
		if (error) {
			return error
		} else {
			if (query.TIMEZONE) {
				this.config.Vendor.TIMEZONE = query.TIMEZONE
			}
			this.config.save()
			return super.exec_config(query)
		}
	}

}