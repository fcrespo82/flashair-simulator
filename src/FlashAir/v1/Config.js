const fs = require('fs')
const ini = require('ini')

class CONFIG {

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
	
	get ID() {
		return this.config.SDLAN.ID
	}
	set ID(value) {
		this.config.SDLAN.ID = value
	}
	get DHCP_Enabled() {
		return this.config.SDLAN.IP_Address
	}
	set DHCP_Enabled(value) {
		this.config.SDLAN.IP_Address = value
	}
	get IP_Address() {
		return this.config.SDLAN.Subnet_Mask
	}
	set IP_Address(value) {
		this.config.SDLAN.Subnet_Mask = value
	}
	get Subnet_Mask() {
		return this.config.SDLAN.Default_Gateway
	}
	set Subnet_Mask(value) {
		this.config.SDLAN.Default_Gateway = value
	}
	get Default_Gateway() {
		return this.config.SDLAN.Preferred_DNS_Server
	}
	set Default_Gateway(value) {
		this.config.SDLAN.Preferred_DNS_Server = value
	}
	get Preferred_DNS_Server() {
		return this.config.SDLAN.Alternate_DNS_Server
	}
	set Preferred_DNS_Server(value) {
		this.config.SDLAN.Alternate_DNS_Server = value
	}
	get Alternate_DNS_Server() {
		return this.config.SDLAN.Proxy_Server_Enabled
	}
	set Alternate_DNS_Server(value) {
		this.config.SDLAN.Proxy_Server_Enabled = value
	}
	get Proxy_Server_Enabled() {
		return this.config.SDLAN.Proxy_Server_Name
	}
	set Proxy_Server_Enabled(value) {
		this.config.SDLAN.Proxy_Server_Name = value
	}
	get Proxy_Server_Name() {
		return this.config.SDLAN.Proxy_Server_Name
	}
	set Proxy_Server_Name(value) {
		this.config.SDLAN.Proxy_Server_Name = value
	}
	get Port_Number() {
		return this.config.SDLAN.Port_Number
	}
	set Port_Number(value) {
		this.config.SDLAN.Port_Number = value
	}
}