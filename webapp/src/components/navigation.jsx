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
            pitch: 1.5,
            objects: null,
            preClickTime: null,
            postClickTime: null,
            runFun: false
        };

        //binding
        this.speakTexts = this.speakTexts.bind(this);
        this.obtainVoices = this.obtainVoices.bind(this);
        this.startNavigation = this.startNavigation.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.stopNavigate = this.stopNavigate.bind(this);
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
        utterThis.rate = this.state.rate;// rate
        utterThis.pitch = this.state.pitch;// pitch
        speechSynthesis.speak(utterThis); //speak
    }


    startNavigation() {
        // var obj = JSON.parse('{ "name":"runoob", "alexa":10000, "site":"www.runoob.com" }');
        // console.log(typeof(obj));
        // console.log(obj.name);

        const socket = new WebSocket('ws://localhost:7979');
        var self = this;
        const bell = new UIfx(
            beepsound,
            {
                volume: 1, // 0~1
                throttleMs: 100
            }
        );


        if (self.state.objects != null) {
            var jsonData = JSON.stringify(self.state.objects);
            socket.addEventListener('open', function(event) {
                socket.send(jsonData);
            });
        }


        socket.addEventListener('message', function(event) {
            console.log(event.data);
            var obj = JSON.parse(event.data);
            if (obj.priority == 4) { // if receive a emergency signal
                bell.play();
            }else {
                self.speakTexts(obj.msg);
            }
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
        if (newProps.voiceProps.langu != null) {
            this.state.langu = newProps.voiceProps.langu;
            this.state.rate = newProps.voiceProps.speed;
            this.state.pitch = newProps.voiceProps.pitch;
        }
        if (newProps.objects != null) {
            this.state.objects = newProps.objects;
        }
        console.log(this.state);
    }



    handleClick () {
        if (this.state.preClickTime == null) {
            console.log("first click");
            var d = new Date();
            this.state.preClickTime = d.getTime();
            this.speakTexts("This button can offer obstacle avoidance service. If you want to use this function, please click it again immediately.");
        }else{
            console.log("second click");
            var d = new Date();
            this.state.postClickTime = d.getTime();
            if(this.state.postClickTime - this.state.preClickTime > 8000) {
                this.state.preClickTime = null;
                this.state.postClickTime = null;
            }else {
                this.startNavigation();
                this.state.preClickTime = null;
                this.state.postClickTime = null;
            }
        }
    }

    stopNavigate () {

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