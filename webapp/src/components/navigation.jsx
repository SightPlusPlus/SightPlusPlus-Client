import React, {Component} from "react";
import {Button} from 'react-bootstrap';


class Navigation extends Component {

    constructor(props) {
        super(props);
        this.state = {
            voiceList: null,
            langu: 2, // default language: British eng
            rate: 2,
            pitch: 1
        };

        //binding
        this.speakTexts = this.speakTexts.bind(this);
        this.obtainVoices = this.obtainVoices.bind(this);
        this.startNavigation = this.startNavigation.bind(this);
    }

    ws = new WebSocket('ws://localhost:7979');



    obtainVoices() {
        this.state.voiceList = window.speechSynthesis.getVoices();
    }


    speakTexts() {
        var utterThis = new SpeechSynthesisUtterance('Red car 3 meters, right. bus stop 5 meters, left.'); // text content
        utterThis.onerror = function (event) {
            console.error('SpeechSynthesisUtterance.onerror');
        }
        utterThis.voice = this.state.voiceList[this.state.langu]; // choose the language type(en-GB)
        utterThis.rate = this.state.rate;// pitch
        utterThis.pitch = this.state.pitch;// rate
        speechSynthesis.speak(utterThis); //speak
    }


    startNavigation() {
        var self = this;
        this.ws.addEventListener('message', function (event) {
            console.log('Message from server ', event.data);
            self.speakTexts();
        });
    }



    componentDidMount() {
        // obtain the language lists
        this.obtainVoices();
        if (speechSynthesis.onvoiceschanged !== undefined) {
            speechSynthesis.onvoiceschanged = this.obtainVoices;
        }

    }



    async componentWillReceiveProps(newProps) {
        this.state.langu = newProps.voiceProps.langu;
        this.state.rate = newProps.voiceProps.rate;
        this.state.pitch = newProps.voiceProps.pitch;
        //var nextProps = newProps.voiceProps;
        console.log(newProps.voiceProps);
    }




    render() {
        return (
            <div>
                <Button variant="success" size="lg" block onClick={this.startNavigation}>
                    Start Navigation
                </Button>
            </div>
        );
    }
}

export default Navigation;


// var ifObtained = setInterval(()=> {
//     console.log(voices);
//     console.log(Object.keys(voices).length);
//
//     if (Object.keys(voices).length != 0) {
//         clearInterval(ifObtained);
//     }
// }, 2000);