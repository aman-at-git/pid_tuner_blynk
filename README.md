# pid_tuner_blynk

Steps to run the script:-

1. Install the latest version of npm on pi using

sudo apt-get update && sudo apt-get upgrade
sudo apt-get install build-essential
sudo npm install -g npm

2. Install the necessary npm packages using

npm install -g blynk-library
npm install -g serialport

3. Create a BLYNK project on the BLYNK app with kp, ki, kd sliders on virtual pin numbers v0, v1 and v2 and power on virtual pin v3.

4. Copy BLYNK project auth token and replace it in index.js file.

5. Create variable for node packages

export NODE_PATH=/usr/local/lib/node_modules

6. Change path to the dir where index.js is present and run the command

node index.js

7. Output should look like:-

    ___  __          __
   / _ )/ /_ _____  / /__
  / _  / / // / _ \/  '_/
 /____/_/\_, /_//_/_/\_\
        /___/

  Give Blynk a Github star! => https://github.com/vshymanskyy/blynk-library-js

Connecting to TCP: blynk-cloud.com 8442
Connected
Authorized
Connected to Blynk Server.

Refer the following article for more help.
https://www.instructables.com/Blynk-JavaScript-in-20-minutes-Raspberry-Pi-Edison/
