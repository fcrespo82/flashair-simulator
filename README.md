# Toshiba [FlashAir](https://flashair-developers.com) simulator

This project aims to facilitate the process of developing software that uses the FlashAir APIs since the FlashAir card is not always available and has some restrictions (such as uptime).

The server was not exhaustive tested and neither includes all [API](https://flashair-developers.com/en/documents/api/) functionalities.

## ROADMAP 

- [ ] command.cgi
    - [x] Get file list
    - [x] Get the number of files
    - [ ] Get update status
    - [ ] Get SSID
    - [ ] Get network password
    - [ ] Get MAC address
    - [ ] Get browser language
    - [ ] Get the firmware version
    - [ ] Get the control image
    - [ ] Get Wireless LAN mode
    - [ ] Get Wireless LAN timeout length
    - [ ] Get application unique information
    - [ ] Get Upload parameters
    - [ ] Get CID
    - [ ] Get time stamp of write event
    - [ ] Get data from shared memory
    - [ ] Set data to shared memory
    - [ ] Get the number of empty sectors
    - [ ] Control SD Interface as user I/O
    - [ ] Enable Photo Share mode
    - [ ] Disable Photo Share mode
    - [ ] Get Photo Share mode status
    - [ ] Get SSID for Photo Share mode
    - [ ] New Get FlashAir Drive(WebDAV) information
    - [ ] Get timezone
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

- [ ] Limit functions by the firmware version
