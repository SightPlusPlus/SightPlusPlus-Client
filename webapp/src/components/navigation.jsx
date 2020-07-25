import React, {Component} from "react";
//import { Button, Modal, Container, Row, Col, Form} from 'react-bootstrap';

export default class Navigation extends Component {

    constructor(props) {
        super(props);
        this.state = {
            voices: null,
        };

        //binding
        //this.speakTexts = this.speakTexts.bind(this);
        this.obtainVoices = this.obtainVoices.bind(this);
    }



    // receive info using websocket to start navigation
    obtainVoices() {
        console.log("obtainVoices");
        //const {voices} = this.state;
        this.state.voices = window.speechSynthesis.getVoices();
        console.log(this.state.voices);
        console.log(Object.keys(this.state.voices).length);
    }



    speakTexts() {
        // var ifObtained = setInterval(()=> {
        //     console.log(voices);
        //     console.log(Object.keys(voices).length);
        //
        //     if (Object.keys(voices).length != 0) {
        //         clearInterval(ifObtained);
        //     }
        // }, 2000);
        console.log("speakTexts");
        var utterThis = new SpeechSynthesisUtterance('hello, we are sight ++!'); // text content
/*        utterThis.onend = function (event) {
            console.log('SpeechSynthesisUtterance.onend');
        }
        utterThis.onerror = function (event) {
            console.error('SpeechSynthesisUtterance.onerror');
        }*/


        utterThis.voice = this.state.voices[2]; // choose the language type(en-GB)

        utterThis.pitch = 1;// pitch
        utterThis.rate = 1;// rate

        speechSynthesis.speak(utterThis); //speak
    }



    componentDidMount() {
        // obtain the language lists
        this.obtainVoices();
        // setTimeout(function(){
        //     console.log(this.state.voices);
        // }, 200);
        console.log(speechSynthesis.onvoiceschanged);
        if (speechSynthesis.onvoiceschanged !== undefined) {
            speechSynthesis.onvoiceschanged = this.obtainVoices;
            console.log(this.state.voices);
        }
        console.log(this.state.voices);

        //speak
        //this.speakTexts();
    }




    render() {
        console.log(this.state.voices);

        return (
            <div>
                <h1>We are navigating for you.</h1>
            </div>
        );
    }
}