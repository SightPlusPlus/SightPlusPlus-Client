import React, {Component} from "react";
import {Button} from 'react-bootstrap';
import UIfx from 'uifx';
import beepsound from '../beepsound.mp3';


class Navigation extends Component {

    constructor(props) {
        super(props);
        this.state = {
            synth: null,
            utterThis: null,
            voiceList: null,
            isMute: false,
            langu: 2, // default language: British eng
            rate: 2,
            pitch: 1.5,
            objects: null,
            lastClickTime: null,
            runFun: false
        };

        //binding
        this.speakTexts = this.speakTexts.bind(this);
        this.obtainVoices = this.obtainVoices.bind(this);
        this.startNavigation = this.startNavigation.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.stopNavigate = this.stopNavigate.bind(this);
    }

    //socket = new WebSocket('ws://localhost:7979');



    obtainVoices() {
        this.state.synth = window.speechSynthesis;
        this.state.voiceList = this.state.synth.getVoices();
    }


    speakTexts(text) {


        if(this.state.synth.paused === true) {
            this.state.synth.resume();
        }


        this.state.utterThis = new SpeechSynthesisUtterance(text); // text content
        this.state.utterThis.onerror = function (event) {
            console.error('SpeechSynthesisUtterance.onerror');
        }
        this.state.utterThis.voice = this.state.voiceList[this.state.langu]; // choose the language type(en-GB)
        this.state.utterThis.rate = this.state.rate;// rate
        this.state.utterThis.pitch = this.state.pitch;// pitch
        this.state.synth.speak(this.state.utterThis);//speak
        //speechSynthesis.speak(utterThis);
    }


    startNavigation() {
        var self = this;
        this.state.socket = new WebSocket('ws://localhost:7979');
        const bell = new UIfx(
            beepsound,
            {
                volume: 1, // 0~1
                throttleMs: 100
            }
        );

        if (this.state.objects !== null) {
            this.state.socket.addEventListener('open', function(event) {
                self.state.socket.send(self.state.objects);
            });
        }


        this.state.socket.addEventListener('message', function(event) {
            console.log(event.data);
            if (self.state.isMute === false) {
                self.speakTexts(event.data);
            }
            // var obj = JSON.parse(event.data);
            // if (obj.priority == 4) { // if receive a emergency signal
            //     bell.play();
            // }else {
            //     self.speakTexts(obj.msg);
            // }
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
        if (newProps.muteFlag === true) {
            console.log("mute");
            this.state.isMute = true;
            this.state.synth.cancel();
            this.speakTexts("Sounds muted.");
        }else {
            if (newProps.voiceProps.langu !== null) {
                this.state.langu = newProps.voiceProps.langu;
                this.state.rate = newProps.voiceProps.speed;
                this.state.pitch = newProps.voiceProps.pitch;
            }
            if (newProps.objects !== null) {
                this.state.objects = newProps.objects;
            }
        }
    }



    handleClick () {
        if(this.state.lastClickTime === null ) {
            var d = new Date();
            this.state.lastClickTime = d.getTime();
            this.speakTexts("This button can offer obstacle avoidance service. " +
                "If you want to use this function, please click it again immediately.");
        }else {
            var d = new Date();
            var duration = d.getTime() - this.state.lastClickTime;

            if (duration > 8500) {
                this.speakTexts("This button can offer obstacle avoidance service. " +
                    "If you want to use this function, please click it again immediately.");
                d = new Date();
                this.state.lastClickTime = d.getTime();
            }else {
                this.startNavigation();
                d = new Date();
                this.state.lastClickTime = d.getTime();
            }
        }
    }


    stopNavigate () {
        this.state.synth.cancel();
        this.state.socket.close();
        this.speakTexts('Obstacle avoidance stopped.');
    }




    render() {
        return (
            <div>
                <Button variant="warning" size="lg" block onClick={this.handleClick}>
                    Start
                </Button>
                <br/>
                <Button variant="danger" size="lg" block onClick={this.stopNavigate}>
                    Stop
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