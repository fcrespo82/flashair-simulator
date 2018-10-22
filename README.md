# Toshiba [FlashAir](https://flashair-developers.com) simulator

This project aims to facilitate the process of developing software that uses the FlashAir APIs since the FlashAir card is not always available and has some restrictions (such as uptime).

The server was not exhaustive tested and neither includes all [API](https://flashair-developers.com/en/documents/api/) functionalities.

## ROADMAP 

- [ ] command.cgi
    - [x] Get file list
    - [x] Get the number of files
    - [x] Get update status
    - [x] Get SSID
    - [x] Get network password
    - [x] Get MAC address
    - [x] Get browser language
    - [x] Get the firmware version
    - [x] Get the control image
    - [x] Get Wireless LAN mode
    - [x] Get Wireless LAN timeout length
    - [x] Get application unique information
    - [x] Get Upload parameters
    - [x] Get CID
    - [x] Get time stamp of write event
    - [ ] Get data from shared memory
    - [ ] Set data to shared memory
    - [ ] Get the number of empty sectors
    - [ ] Control SD Interface as user I/O
    - [x] Enable Photo Share mode
    - [x] Disable Photo Share mode
    - [x] Get Photo Share mode status
    - [x] Get SSID for Photo Share mode
    - [x] Get FlashAir Drive(WebDAV) information
    - [Partialy] Get timezone
- [ ] config.cgi
    - [ ] APPAUTOTIME
    - [ ] APPINFO
    - [ ] APPMODE
    - [ ] APPNETWORKKEY
    - [ ] APPSSID
    - [ ] BRGNETWORKKEY
    - [ ] BRGSSID
    - [ ] CIPATH
    - [ ] New CLEARCODE
    - [ ] MASTERCODE
    - [ ] New TIMEZONE
    - [ ] New WEBDAV
- [x] thumbnail.cgi
    - [x] Get thumbnail
- [ ] upload.cgi
    - [ ] Upload file
    - [ ] Delete file
    - [ ] Set upload directory
    - [ ] Set system time
    - [ ] Restrict the write ability of host devices

- [Partialy] Limit functions by the firmware version
