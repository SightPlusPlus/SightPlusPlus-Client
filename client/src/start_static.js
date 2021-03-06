#!/usr/bin/env node

//  Starts the static system.
//  Uses the coordinates of the place and zone
//  To be used when at locations (zones/places)
//  To start type into the terminal node start_static.js <coordinates>


const {writeDb} = require("./location");
const WebSocketClient = require('websocket').client;

const client = new WebSocketClient();

client.on('connectFailed', function (error) {
    console.log('Connect Error: ' + error.toString());
});

client.on('connect', function (connection) {
    console.log('WebSocket Client Connected');
    connection.on('error', function (error) {
        console.log("Connection Error: " + error.toString());
    });
    connection.on('close', function () {
        console.log('echo-protocol Connection Closed');
    });
    connection.on('message', function (message) {
        if (message.type === 'utf8') {
            if (JSON.parse(message.utf8Data)['msg'] !== undefined) {
                writeDb(JSON.parse(message.utf8Data)['msg'], JSON.parse(message.utf8Data)['name'], JSON.parse(message.utf8Data)['priority']);
                console.log(JSON.parse(message.utf8Data)['msg'], JSON.parse(message.utf8Data)['name'], JSON.parse(message.utf8Data)['priority']);
            }
        }
    });

    function sendNumber() {
        if (connection.connected) {
            var number = Math.round(Math.random() * 0xFFFFFF);
            connection.sendUTF(number.toString());
            // setTimeout(sendNumber, 1000);
        }
    }

    sendNumber();
});

client.connect('ws://localhost:7979/');
