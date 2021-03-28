# SightPlusPlus Client

## Introduction
A NodeJS Client adds messages into the Firebase Realtime Database from where the messages will be used by the [SightPlusPlus Mobile Application](https://github.com/SightPlusPlus/SightPlusPlus-FlutterApp). The system converts the public ip address into (remote) or converts the coordinates (static) into an id usable by the Firebase. It adds at that certain id the message, priority and name of the object so that the mobile app can use them. 

## Prerequisites
+ Install the [SightPlusPlus Server](https://github.com/SightPlusPlus/SightPlusPlus-Server). Follow the instructions from there

+ A Realsense Camera from Intel, required to use the system at its full potential, but you can use the system with pre-recorded videos

+ Install Node.js

Download the installation package from the official website of [Node.js](https://nodejs.org/en/). Choose the LTS version. I am using NodeJS version 11.0, but any of them will work.

+ (For Windows) Add the installation directory into the environment variables of your OS.


## Run it
+ Install the dependencies

After you download the project package and extract it, open CMD in the 'client' folder. 
Run these commands below:
```bash
npm install
```

+ Run the Intel_IXN_SightPP Server

Please run the Intel_IXN_SightPP Server before running the web application following the instructions this page provides:
[SightPlusPlus Server](https://github.com/SightPP/Intel_IXN_SightPP)


+ Navigate to the client/src/ folder

+ If you need to use the remote functions of the system, run in the terminal:

```bash
node start_remote.js
```
ALL 3 SYSTEMS (APP, SERVER, CLIENT) NEED TO BE ON THE SAME NETWORK TO WORK.


+ If you want to use the remote functionalities, run in the terminal (make sure you change the latitude and longitude with the desired coordinates):
```bash
node start_static.js <latitude, longitude>
```
The system will convert the coordinates into an id so the app will be able to calculate the closes plate to run the static system.


## Related APIs
+ [NodeJS public-ip](https://www.npmjs.com/package/public-ip)

+ [NodeJS websocket](https://www.npmjs.com/package/websocket)

+ [NodeJS firebase-admin](https://www.npmjs.com/package/firebase-admin)
