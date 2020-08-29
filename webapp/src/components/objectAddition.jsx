import React, {Component} from "react";
import { Button} from 'react-bootstrap';

export default class ObjectAddition extends Component {

    constructor(props) {
        super(props);
        this.state = {
            synth: null,
            utterThis: null,
            voiceList: null,
            lastClickTime: null
        };

        //binding
        this.obtainVoices = this.obtainVoices.bind(this);
        this.recogniseSpeech = this.recogniseSpeech.bind(this);
        this.speakTexts = this.speakTexts.bind(this);
        this.setObjects = this.setObjects.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
        // obtain the language lists
        this.obtainVoices();
        if (speechSynthesis.onvoiceschanged !== undefined) {
            speechSynthesis.onvoiceschanged = this.obtainVoices;
        }

    }

    obtainVoices() {
        this.state.synth = window.speechSynthesis;
        //console.log(window.speechSynthesis);
        this.state.voiceList = this.state.synth.getVoices();
    }

    recogniseSpeech(){
        var speechConfig = window.SpeechSDK.SpeechConfig.fromSubscription('089ccb86c773418db9cf38d11833f5a0', 'westus');
        speechConfig.speechRecognitionLanguage = "en-US";
        var audioConfig  = window.SpeechSDK.AudioConfig.fromDefaultMicrophoneInput();
        var recogniser = new window.SpeechSDK.SpeechRecognizer(speechConfig, audioConfig);

        recogniser.recognizeOnceAsync( result => {
            if (result.text !== undefined) {
                this.speakTexts(`Your preference is ${result.text}. This will be applied to your obstacle avoidance service.`);
                var c = result.text.toLowerCase();
                c = c.replace(/[^a-z]/gi, ' ');
                var o = c.split(' ');
                var objects = [];
                o.forEach(item => {
                    if (item !== "") {
                        objects.push(item);
                    }
                })
                if (objects !== []) {
                    console.log(objects);
                    this.props.setExtraObject(objects);
                }else {
                    this.speakTexts('you gave us an invalid answer. please try this button again in a quieter environment');
                }
            }else {
                this.speakTexts('we don\'t receive your answer.please try this button again');
            }
        },err => {
            console.log(err);
        });
    }

    speakTexts(text) {
        this.state.utterThis = new SpeechSynthesisUtterance(text); // text content
        this.state.utterThis.onerror = function (event) {
            console.error('SpeechSynthesisUtterance.onerror');
        }
        this.state.utterThis.voice = this.state.voiceList[2]; // choose the language type(en-GB)
        this.state.utterThis.rate = 2;// rate
        this.state.utterThis.pitch = 1.5;// pitch
        this.state.synth.speak(this.state.utterThis);//speak
        //speechSynthesis.speak(utterThis);
    }


    setObjects() {
        var text = 'Hello, in this system, you can mark the objects you preferred by speaking... ' +
            'Now, please say the names of your preferred objects. after three d sound. d d d';
        this.state.utterThis = new SpeechSynthesisUtterance(text); // text content
        this.state.utterThis.onerror = function (event) {
            console.error('SpeechSynthesisUtterance.onerror');
        }
        this.state.utterThis.voice = this.state.voiceList[2]; // choose the language type(en-GB)
        this.state.utterThis.rate = 2;// rate
        this.state.utterThis.pitch = 1.5;// pitch
        this.state.synth.speak(this.state.utterThis);//speak
        //speechSynthesis.speak(utterThis);
        var self = this;
        this.state.utterThis.onend = function(event) {
            self.recogniseSpeech();
        }
    }


    handleClick () {
        if(this.state.lastClickTime === null ) {
            var d = new Date();
            this.state.lastClickTime = d.getTime();
            this.speakTexts("This button can let you set the preferred objects which you would like to know first. " +
                "If you want to use this function, please click it again immediately..");
        }else {
            var d = new Date();
            var duration = d.getTime() - this.state.lastClickTime;

            if (duration > 9000) {
                this.speakTexts("This button can let you set the preferred objects which you would like to know first. " +
                    "If you want to use this function, please click it again immediately..");
                d = new Date();
                this.state.lastClickTime = d.getTime();
            }else {
                this.setObjects();
                d = new Date();
                this.state.lastClickTime = d.getTime();
            }
        }
    }



    render() {
        return (
            <div>
                <Button  variant="primary" size="lg" block onClick={this.handleClick}>
                    Mark Preferred Objects
                </Button>
            </div>
        );
    }
}