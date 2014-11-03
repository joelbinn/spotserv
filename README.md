SpotServ
========

Setting up the Raspberry
------------------------
### Install
Install the RASPBIAN image, see http://www.raspberrypi.org/downloads/
Setup Wifi on Raspberry: http://www.howtogeek.com/167425/how-to-setup-wi-fi-on-your-raspberry-pi-via-the-command-line/
Install node: http://weworkweplay.com/play/raspberry-pi-nodejs/

### In case of problems
General, see: http://elinux.org/R-Pi_Troubleshooting
ALSA issues, see https://docs.mopidy.com/en/latest/installation/raspberrypi/

### Run on boot on Raspberry pi
Define things to run on boot in /etc/rc.local.

Run as the default pi user.
Because that user does have node in his path, the command is known.

su pi -c 'node /home/pi/server.js < /dev/null &'

### Install spotserv
Clone this repo, then

    $ npm install

### Start spotserv
First copy appkey file to the clone, then:

    $ npm start

