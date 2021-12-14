# PiDisplay - Automation for Digital Displays

Enable a Raspberry Pi to automatically run a cec-enabled display automatically.

## Table of Contents

- [PiDisplay - Automation for Digital Displays](#pidisplay---automation-for-digital-displays)
  - [Table of Contents](#table-of-contents)
  - [General Information](#general-information)
  - [Technologies](#technologies)
  - [Setup](#setup)

## General Information

PiDisplay allows a Raspberry Pi to automatically run digital signage through a web-portal on your local network.

This project has been tested on Raspberry Pi 4. Raspberry Pi Zero is not supported due to hardware limitations.

## Technologies

- Python 3.6
  - Django 3.2.9
  - Django Rest Framework 3.12.4
  - Django-cords-headers 3.10.0
  - PyAutoGui 0.9.53
  - Python-crontab 2.6.0
  - Python-dotenv 0.19.2
  - Selenium 4.1.0
  - Whitenoise 5.3.0
- React.js
  - Axios
  - React Router
- HTML
- CSS
- Apache 2

## Setup

1. Install operating system on SD card via rpi imager

2. Activate SSH by creating ssh file in boot directory

```
touch ssh
```

3. Create wpa_supplicant.conf file for wireless setup

```
sudo nano wpa_supplicant.conf
```

4. Paste the following configuration

```
ctrl_interface=DIR=/var/run/wpa_supplicant GROUP=netdev
update_config=1
country=US

network={
  ssid="<name of network>"
  psk="<password for network>"
}
```

You can configure as many networks as you need following that configuration pattern.

5. Change Raspbery Pi default password

Once logged into the Pi via ssh, run the following command and follow the prompts:

```
passwd
```

6. Disable Screen Blanking and set Hostname (optional)

Run the following command via the terminal:

```
sudo raspi-config
```

> Select 1 System Options\
> Select S4 Hostname\
> Set hostname to desired hostname\
> Select 2 Display Options\
> Select D4 Screen Blanking\
> Select No\
> Select Finish

7. Set Up GUI

Connect raspberry pi to a monitor and usb mouse or touchscreen monitor\
Complete on-screen setup

8. Update raspberry pi

```
sudo apt update
sudo apt ugrade
```

9. Create pi-display directory and clone from github

```
mkdir ~/pi-display
cd ~/pi-display
git clone https://github.com/Brandon-Ritchie/PiDisplay.git .
```

10. Set up virtual environment and install requirements

Inside of the ~/pi-display directory run the following commands:

```
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

11. Set secret key in .env file inside of /pi-display/backend directory

```
touch ~/pi-display/backend/.env
sudo nano ~/pi-display/backend/.env
```

Paste the following text into your .env file

```
SECRET_KEY=<insert your secret key here>
```

1.  Install cec-utils and chromium-chromedriver

```
sudo apt install cec-utils -y
sudo apt install chromium-chromedriver
```

13. Install Apache2 Server on Pi

Install Apache2 with the following command:

```
sudo apt install apache2 -y
```

Set permissions and change ownership with the following commands

```
sudo usermod -a -G www-data pi
sudo chown -R -f www-data:www-data /var/www/html
chmod g+w ~/pi-display/backend
chmod g+w ~/pi-display/backend/db.sqlite3
sudo chown :www-data ~/pi-display/.venv
sudo chown :www-data ~/pi-display/backend
sudo chown :www-data ~/pi-display/backend/db.sqlite3
```

> Make sure to logout and then back in for the changes to take effect.

Install mod-wsgi-py3 so Apache can work with Python:

```
sudo apt install libapache2-mod-wsgi-py3
```

Modify Apache default config file in /etc/apache2/sites-available/000-default.conf

```
<VirtualHost *:80>

    ServerAdmin webmaster@localhost
    DocumentRoot /var/www/html

    ErrorLog ${APACHE_LOG_DIR}/error.log
    CustomLog ${APACHE_LOG_DIR}/access.log combined

    WSGIPAssAuthorization On

    Alias /static /home/pi/pi-display/backend/build/static
        <Directory /home/pi/pi-display/backend/build/static>
            Require all granted
        </Directory>

        <Directory /home/pi/pi-display/backend/backend>
            <Files wsgi.py>
                Require all granted
            </Files>
        </Directory>

        WSGIDaemonProcess django python-path=/home/pi/pi-display/backend
        python-home=/home/pi/pi-display/.venv
        WSGIProcessGroup django
        WSGIScriptAlias / /home/pi/pi-display/backend/backend/wsgi.py

</VirtualHost>

# vim: syntax=apache ts=4 sw=4 sts=4 sr noet
```

Restart Apache for changes to take effect:

```
sudo systemctl restart apache2
```

1.  setup passwordless shutdown in /etc/sudoers:

https://help.ubuntu.com/community/Sudoers

```
Cmnd_Alias SHUTDOWN_CMDS = /sbin/poweroff, /sbin/halt, /sbin/reboot, /sbin/shutdown

www-data ALL=(ALL) NOPASSWD: SHUTDOWN_CMDS
```
