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



    obtainVoices() {
        this.state.synth = window.speechSynthesis;
        this.state.voiceList = this.state.synth.getVoices();
    }


    speakTexts(text) {
        this.state.utterThis = new SpeechSynthesisUtterance(text); // text content
        this.state.utterThis.onerror = function (event) {
            console.error('SpeechSynthesisUtterance.onerror');
        }
        this.state.utterThis.voice = this.state.voiceList[this.state.langu]; // choose the language type(en-GB)
        this.state.utterThis.rate = this.state.rate;// rate
        this.state.utterThis.pitch = this.state.pitch;// pitch
        this.state.synth.speak(this.state.utterThis);//speak
    }


    startNavigation() {
        var self = this;
        this.state.socket = new WebSocket('ws://localhost:7979');
        this.state.isMute = false;
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
            var obj = JSON.parse(event.data);
            if (obj.priority == 4) { // if receive a emergency signal
                bell.play();
            }else {
                if (self.state.isMute === false) {
                    self.speakTexts(obj.name);
                    console.log(obj.name);
                }
            }
       })
    }



    componentDidMount() {
        // obtain the language lists
        if (window.speechSynthesis !== undefined) {
            this.obtainVoices();
            if (speechSynthesis.onvoiceschanged !== undefined) {
                speechSynthesis.onvoiceschanged = this.obtainVoices;
            }
        }else {
            console.log("cannot use speech APIs");
        }
    }



    componentWillReceiveProps(newProps) {
        //changeButton
        if (newProps.cButton === true) {
            if (this.state.socket !== null && this.state.socket !== undefined) {
                if (this.state.socket.readyState === 1) {
                    this.speakTexts('Obstacle avoidance stopped.');
                    this.state.socket.close();
                }
            }
        }

        //mute
        if (newProps.muteFlag === true) { // mute
            if (this.state.synth !== null && this.state.synth.speaking === true) {
                this.state.synth.cancel();
                this.state.isMute = true;
            }
        }else {  // resume
            if (newProps.muteFlag === false) {
                this.state.isMute = false;
            }
        }

        //set voice mode
        if (Array.prototype.isPrototypeOf(newProps.voiceProps) && newProps.voiceProps.length !== 0) {
            this.state.langu = newProps.voiceProps.langu;
            this.state.rate = newProps.voiceProps.speed;
            this.state.pitch = newProps.voiceProps.pitch;
        }

        //mark preferred objects
        if (Array.prototype.isPrototypeOf(newProps.objects) && newProps.voiceProps.objects !== 0) {
            this.state.objects = newProps.objects;
        }
    }



    handleClick () {
        if(this.state.lastClickTime === null ) { // click 1
            var d = new Date();
            this.state.lastClickTime = d.getTime();
            if (window.speechSynthesis.speaking === true) {
                window.speechSynthesis.cancel();
            }
            this.speakTexts("This button can offer obstacle avoidance service. " +
                "If you want to use this function, please click it again immediately.");
        }else {
            var d = new Date();
            var duration = d.getTime() - this.state.lastClickTime;

            if (duration > 8500) { // click 1
                if (window.speechSynthesis.speaking === true) {
                    window.speechSynthesis.cancel();
                }
                this.speakTexts("This button can offer obstacle avoidance service. " +
                    "If you want to use this function, please click it again immediately.");
                d = new Date();
                this.state.lastClickTime = d.getTime();
            }else {  // click 2
                if (window.speechSynthesis.speaking === true) {
                    window.speechSynthesis.cancel();
                }
                this.startNavigation();
                d = new Date();
                this.state.lastClickTime = d.getTime();
            }
        }
    }


    stopNavigate () {
        if (this.state.synth !== undefined && this.state.synth.speaking === true) {
            this.state.synth.cancel();
        }

        console.log(this.state.socket);

        if (this.state.synth === null || this.state.socket === undefined) {
            this.speakTexts('You have not open the obstacle avoidance service.');
        }else {
            if (this.state.socket.readyState !== 1) {
                this.speakTexts('You have not open the obstacle avoidance service.');
            }else {
                this.state.socket.close();
                this.speakTexts('Obstacle avoidance stopped.');
            }
        }
    }




    render() {
        return (
            <div>
                <Button variant="warning" size="lg" block onClick={this.handleClick}>
                    Start
                </Button>
                <Button variant="danger" size="lg" block onClick={this.stopNavigate}>
                    Stop
                </Button>
            </div>
        );
    }
}

export default Navigation;