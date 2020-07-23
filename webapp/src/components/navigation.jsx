import React, {Component} from "react";
//import { Button, Modal, Container, Row, Col, Form} from 'react-bootstrap';

export default class Navigation extends Component {

    constructor(props) {
        super(props);
        this.state = {
            voice: null,
        };

        //binding
        this.speakTexts = this.speakTexts.bind(this);
        this.obtainVoices = this.obtainVoices.bind(this);
    }

    obtainVoices() {

    }

    // receive info using websocket to start navigation

    speakTexts() {
        var voices = window.speechSynthesis.getVoices();//get language lists

        //setInterval(, 10);


        var utterThis = new SpeechSynthesisUtterance('hello, we are sight ++!'); // text content
/*        utterThis.onend = function (event) {
            console.log('SpeechSynthesisUtterance.onend');
        }
        utterThis.onerror = function (event) {
            console.error('SpeechSynthesisUtterance.onerror');
        }*/


        utterThis.voice = voices[2]; // choose the language type(en-GB)
        console.log(utterThis.voice);

        utterThis.pitch = 1;// pitch
        utterThis.rate = 1;// rate

        speechSynthesis.speak(utterThis); //speak
    }

    componentDidMount() {
        // choose the language


        //speak
        this.speakTexts();
    }




    render() {
        return (
            <div>
                <h1>We are navigating for you.</h1>
            </div>
        );
    }
}