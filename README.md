# Simulador para Toshiba [FlashAir](https://flashair-developers.com)

Este projeto tem como intenção facilitar o processo de desenvolvimento de softwares que queiram usar as APIs do FlashAir pois o cartão nem sempre está diponível e tem algumas limitações (como o tempo de atividade).

O servidor não foi testado exaustivamente, e nem inclui todas as funcionalidades da [API](https://flashair-developers.com/en/documents/api/)

Note que nem todas as funcionalidades estão presentes em todas as versões de firmware.

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

- [ ] Limitar as funções de acordo com a versão do firmware



Toshiba FlashAir é um cartão SD com a funcionalidade Wi-Fi embutida para fácil acesso a seus arquivos.

