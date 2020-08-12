import React, {Component} from "react";
import {Button} from 'react-bootstrap';
import UIfx from 'uifx';
import beepsound from '../beepsound.mp3';


class Navigation extends Component {

    constructor(props) {
        super(props);
        this.state = {
            voiceList: null,
            langu: 2, // default language: British eng
            rate: 2,
            pitch: 1,
            objects: null,
        };

        //binding
        this.speakTexts = this.speakTexts.bind(this);
        this.obtainVoices = this.obtainVoices.bind(this);
        this.startNavigation = this.startNavigation.bind(this);
    }

    //ws = new WebSocket('ws://localhost:7979');



    obtainVoices() {
        this.state.voiceList = window.speechSynthesis.getVoices();
    }


    speakTexts(text) {
        var utterThis = new SpeechSynthesisUtterance(text); // text content
        utterThis.onerror = function (event) {
            console.error('SpeechSynthesisUtterance.onerror');
        }
        utterThis.voice = this.state.voiceList[this.state.langu]; // choose the language type(en-GB)
        utterThis.rate = this.state.rate;// pitch
        utterThis.pitch = this.state.pitch;// rate
        speechSynthesis.speak(utterThis); //speak
    }


    startNavigation() {
        const bell = new UIfx(
            beepsound,
            {
                volume: 1, // 0~1
                throttleMs: 100
            }
        )

        bell.play();


        const socket = new WebSocket('ws://localhost:7979');
        var self = this;

        var jsonData = JSON.stringify(self.state.objects);
        socket.addEventListener('open', function(event) {
            socket.send(jsonData);
        })

        socket.addEventListener('message', function(event) {
            console.log('Message from server ', event.data);
            self.speakTexts("hh");
        })

    }



    componentDidMount() {
        // obtain the language lists
        this.obtainVoices();
        if (speechSynthesis.onvoiceschanged !== undefined) {
            speechSynthesis.onvoiceschanged = this.obtainVoices;
        }

    }



    async componentWillReceiveProps(newProps) {
        console.log(newProps);
        this.state.langu = newProps.voiceProps.langu;
        this.state.rate = newProps.voiceProps.speed;
        this.state.pitch = newProps.voiceProps.pitch;
        this.state.objects = newProps.objects;
        console.log(this.state);
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