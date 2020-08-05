import React, {Component} from "react";

export default class ConnectionExample extends Component {

    constructor(props) {
        super(props);
        this.state = {
        };

    }

    ws = new WebSocket('ws://localhost:7979');

    componentDidMount() {

        // Connection opened
        // this.ws.addEventListener('open', function (event) {
        //     this.ws.send('Hello Server!');
        // });


        this.ws.addEventListener('message', function (event) {
            console.log('Message from server ', event.data);
        });
    }

    //     this.ws.onopen = function(evt) {
    //         console.log("Connection open ...");
    //         //this.ws.send("Hello WebSockets!");
    //     };
    //
    //     this.ws.onmessage = function(evt) {
    //         console.log( "Received Message: " + evt.data);
    //         this.ws.close();
    //     };
    //
    //     this.ws.onclose = function(evt) {
    //         console.log("Connection closed.");
    //     };
    //
    // }


    render() {
        return (
            <div>
                <h1> WebSocket Example...</h1>
            </div>
        );
    }

}