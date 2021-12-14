> Install operating system on SD card via rpi imager

> Activate SSH by creating ssh file in boot directory

    touch ssh

> Create wpa_supplicant.conf file for wireless setup

    sudo nano wpa_supplicant.conf

Paste the following configuration

    ctrl_interface=DIR=/var/run/wpa_supplicant GROUP=netdev
    update_config=1
    country=US

    network={
      ssid="<name of network>"
      psk="<password for network>"
    }

You can configure as many networks as you need following that configuration pattern.

> Change Raspbery Pi default password

Once logged into the Pi via ssh, run the following command and follow the prompts:

    passwd

> Disable Screen Blanking and set Hostname (optional)

Run the following command via the terminal:

    sudo raspi-config

Select 1 System Options

Select S4 Hostname

Set hostname to desired hostname

Select 2 Display Options

Select D4 Screen Blanking

Select No

Select Finish

> Set Up GUI

Connect raspberry pi to a monitor and usb mouse or touchscreen monitor

Complete on-screen setup

> Update raspberry pi

    sudo apt update
    sudo apt ugrade

> Create pi-display directory and clone from github

    mkdir ~/pi-display
    cd ~/pi-display
    git clone https://github.com/Brandon-Ritchie/PiDisplay.git .

> Install .venv and install requirements from requirements.txt

Inside of the ~/pi-display directory run the following commands:

    python3 -m venv .venv
    source .venv/bin/activate
    pip install -r requirements.txt

> Set permissions for Django backend and db

    chmod g+w ~/pi-display/backend
    chmod g+w ~/pi-display/backend/db.sqlite3
    sudo chown :www-data ~/pi-display/.venv
    sudo chown :www-data ~/pi-display/backend
    sudo chown :www-data ~/pi-display/backend/db.sqlite3

> Set secret key in .env file inside of /pi-display/backend directory

    touch ~/pi-display/backend/.env
    sudo nano ~/pi-display/backend/.env

Paste the following text into your .env file

    SECRET_KEY=<insert your secret key here>

> Install cec-utils and chromium-chromedriver

    sudo apt install cec-utils -y
    sudo apt install chromium-chromedriver

> Install Apache2 Server on Pi

Set Apache2 config settings in /etc/apache2/sites-available/000-default.conf

    <VirtualHost *:80>
        # The ServerName directive sets the request scheme, hostname and port that
        # the server uses to identify itself. This is used when creating
        # redirection URLs. In the context of virtual hosts, the ServerName
        # specifies what hostname must appear in the request's Host: header to
        # match this virtual host. For the default virtual host (this file) this
        # value is not decisive as it is used as a last resort host regardless.
        # However, you must set it for any further virtual host explicitly.
        #ServerName www.example.com

        ServerAdmin webmaster@localhost
        DocumentRoot /var/www/html

        # Available loglevels: trace8, ..., trace1, debug, info, notice, warn,
        # error, crit, alert, emerg.
        # It is also possible to configure the loglevel for particular
        # modules, e.g.
        #LogLevel info ssl:warn

        ErrorLog ${APACHE_LOG_DIR}/error.log
        CustomLog ${APACHE_LOG_DIR}/access.log combined

        # For most configuration files from conf-available/, which are
        # enabled or disabled at a global level, it is possible to
        # include a line for only one particular virtual host. For example the
        # following line enables the CGI configuration for this host only
        # after it has been globally disabled with "a2disconf".
        #Include conf-available/serve-cgi-bin.conf

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

            WSGIDaemonProcess django python-path=/home/pi/pi-display/backend python-home=/home/pi/pi-display/.venv
            WSGIProcessGroup django
            WSGIScriptAlias / /home/pi/pi-display/backend/backend/wsgi.py

    </VirtualHost>

    # vim: syntax=apache ts=4 sw=4 sts=4 sr noet

setup passwordless shutdown in /etc/sudoers:

https://help.ubuntu.com/community/Sudoers

    Cmnd_Alias SHUTDOWN_CMDS = /sbin/poweroff, /sbin/halt, /sbin/reboot

    www-data ALL=(ALL) NOPASSWD: SHUTDOWN_CMDS
