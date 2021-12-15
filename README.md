# PiDisplay - Automation for Digital Displays

## Table of Contents

---

- [PiDisplay - Automation for Digital Displays](#pidisplay---automation-for-digital-displays)
  - [Table of Contents](#table-of-contents)
  - [General Information](#general-information)
  - [Technologies](#technologies)
  - [Installation](#installation)
    - [Operating System](#operating-system)
    - [Hardware Configuration](#hardware-configuration)
    - [Software Setup](#software-setup)
  - [Usage](#usage)

## General Information

---

PiDisplay allows a Raspberry Pi to automatically run digital signage through a web-portal on your local network.

This project has been tested on Raspberry Pi 4. Raspberry Pi Zero is not supported due to hardware limitations.

## Technologies

---

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

## Installation

---

### Operating System

> Install Raspberry Pi OS (32-bit) using Raspberry Pi Imager. The software can be found on the official Raspberry Pi website: https://www.raspberrypi.com/software/

### Hardware Configuration

Enable ssh by creating a file named "ssh" in the boot directory.

_Mac/Linux:_

```
touch ssh
```

_Windows:_

```
TODO: Figure this out
```

Create a wpa_supplicant.conf file in the boot directory.

_Mac/Linux:_

```
sudo nano wpa_supplicant.conf
```

_Windows:_

```
TODO: Figure this out
```

Paste the following configuration into the file to configure a wireless connection. You can add as many network objects as you like.

```
ctrl_interface=DIR=/var/run/wpa_supplicant GROUP=netdev
update_config=1
country=<Insert your 2-digit country code>

network={
  ssid="<name of network>"
  psk="<password for network>"
}
```

SSH into the Raspberry Pi from another computer via its IP address

```
ssh pi@xx.xx.xx.xx
```

The default password is "raspberry". Once logged into the Pi via ssh, run the following command and follow the prompts to change it to something more secure.

```
passwd
```

We will need to disable screen blanking so the raspberry pi does not go to sleep. We can also set a hostname for the device, if wanted. Run the following command via the terminal to access the configuration menu:

```
sudo raspi-config
```

Follow these instructions to change the settings:

> Select 1 System Options\
> Select S4 Hostname\
> Set hostname to desired hostname\
> Select 2 Display Options\
> Select D4 Screen Blanking\
> Select No\
> Select Finish

### Software Setup

Run the following commands over ssh to update the Pi. This will likely take awhile, depending on your internet speeds.

```
sudo apt update
sudo apt ugrade
```

Next we need to download the remote repository. Run the following command over ssh to clone the respository to the /home/pi/pi-display directory. It is very important that the repository is in this directory for the program to function.

```
git clone https://github.com/Brandon-Ritchie/PiDisplay.git ~/pi-display
```

Next we need to set up a virtual enviroment for Apache. Inside of the ~/pi-display directory run the following commands:

```
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

Generate and define a secret key for Django in the ~/pi-display/backend/.env file. You can generate a secret key at https://miniwebtool.com/django-secret-key-generator/

```
sudo nano ~/pi-display/backend/.env
```

Paste the following text into your .env file

```
SECRET_KEY=<insert your secret key here>
```

The following packages need to be installed at the system level for the display to be controlled and driven by Cron jobs.

```
sudo apt install cec-utils -y
sudo apt install chromium-chromedriver
pip install selenium
pip install pyautogui
```

Install Apache2 with the following command:

```
sudo apt install apache2 -y
```

Change apache user to pi

```
sudo nano etc/apache2/envvars
```

Edit the following lines

```
export APACHE_RUN_USER=pi
export APACHE_RUN_GROUP=pi
```

Set permissions and change ownership with the following commands -- Maybe no longer needed if using pi as the run_user and run_group

```
//?? sudo usermod -a -G www-data pi
//?? sudo chown -R -f www-data:www-data /var/www/html
//?? chmod g+w ~/pi-display/backend
//?? chmod g+w ~/pi-display/backend/db.sqlite3
//?? sudo chown www-data ~/pi-display/.venv
//?? sudo chown www-data ~/pi-display/backend
//?? sudo chown www-data ~/pi-display/backend/db.sqlite3
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

## Usage
