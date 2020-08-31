import React, {Component} from "react";
import { Button} from 'react-bootstrap';

export default class VoiceConfig extends Component {

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
        this.setVoice = this.setVoice.bind(this);
        this.speakTexts = this.speakTexts.bind(this);
        this.recogniseSpeech = this.recogniseSpeech.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.checkValidation = this.checkValidation.bind(this);
    }

    componentDidMount() {
        // obtain the language lists
        this.obtainVoices();
        if (speechSynthesis.onvoiceschanged !== undefined) {
            speechSynthesis.onvoiceschanged = this.obtainVoices;
        }

    }


    async componentWillReceiveProps(newProps) {
        //console.log(newProps);
        // if (newProps.stopId !== 'voiceConfig' && this.state.synth.speaking === true) {
        //     this.state.synth.cancel();
        // }
    }



    obtainVoices() {
        this.state.synth = window.speechSynthesis;
        this.state.voiceList = this.state.synth.getVoices();
    }


    checkValidation(str) {
        var langu;
        var speed;
        var pitch;
        var checkLangu = 0;
        var checkSpeed = 0;
        var checkPitch = 0;

        //set language 2 for British eng, 1 for American eng

        if (str[0] === "British" || str[0] === "American") {
            if(str[0] === "British") {
                langu = 2;
            }else {
                langu = 1;
            }
        }else {
            checkLangu = 1;
        }
        console.log("langu = " + langu);

        // set the speed
        switch (str[3]) {
            case "one":
                speed = 1;
                break;
            case "two":
                speed = 2;
                break;
            default:
                speed = parseFloat(str[3]);
        }
        console.log("speed = " + speed);
        if (isNaN(speed)) {
            checkSpeed = 1;
        }else {
            if (speed < 0.1 || speed > 4) {
                checkSpeed = 2;
            }
        }


        // set the pitch
        switch (str[5]) {
            case "one":
                pitch = 1;
                break;
            case "two":
                pitch = 2;
                break;
            default:
                pitch = parseFloat(str[5]);
        }
        console.log("pitch = " + pitch);
        if (isNaN(pitch)) {
            checkPitch = 1;
        }else {
            if (pitch < 0 || pitch > 2) {
                checkPitch = 2;
            }
        }


        // Valid Input
        if (checkLangu === 0 && checkSpeed === 0 && checkPitch === 0) {
            let voiceProps = {langu, speed, pitch};
            return voiceProps;
        }


        //Invalid Input
        //invalid language type
        if (checkLangu === 1) {
            this.speakTexts("Invalid Language type.");
        }

        //invalid speed
        switch (checkSpeed) {
            case 1:
                this.speakTexts("Invalid speed value.");
                break;
            case 2:
                this.speakTexts("Invalid speed value. The valid range of the speed value is 0.1 to 4.");
                break;
        }

        //invalid pitch
        switch (checkPitch) {
            case 1:
                this.speakTexts("Invalid pitch value.");
                break;
            case 2:
                this.speakTexts("Invalid pitch value. The valid range of the speed value is 0 to 2.");
                break;
        }

        return false;
    }



    recogniseSpeech(){
        var speechConfig = window.SpeechSDK.SpeechConfig.fromSubscription('089ccb86c773418db9cf38d11833f5a0', 'westus');
        speechConfig.speechRecognitionLanguage = "en-US";
        var audioConfig  = window.SpeechSDK.AudioConfig.fromDefaultMicrophoneInput();
        var recogniser = new window.SpeechSDK.SpeechRecognizer(speechConfig, audioConfig);

        recogniser.recognizeOnceAsync( result => {
            console.log(result.text);
            if (result.text !== undefined) {
                var str = result.text.split(' ');
                console.log(str);
                var checkResult = this.checkValidation(str);
                if ( checkResult === false) {
                    this.speakTexts('you gave us an invalid answer. Please try this button again in a quieter environment');
                }else {
                    this.speakTexts(`Your preference is ${result.text}. This will be applied to your obstacle avoidance service.`);
                    this.props.setVoiceProps(checkResult);
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



    setVoice() {
        var text = 'Hello, in this system, you can choose British English or American English... ' +
            'You can also set the speed and pitch of the voice. ' +
            'The recommended voice speed and pitch are both 1.5...But you can still set them by speaking… ' +
            'For example, if you choose British English and a lower speed and pitch, both of them are 1, ' +
            'please say your preference in this form... British English, speed 1, pitch 1..' +
            'Now, please say your preferred language, speed and pitch. after three d sound. d d d';
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
            if (window.speechSynthesis.speaking === true) {
                window.speechSynthesis.cancel();
            }
            this.speakTexts("This button can let you set the voice mode. " +
                "If you want to use this function, please click it again immediately.");
        }else {
            var d = new Date();
            var duration = d.getTime() - this.state.lastClickTime;

            if (duration > 8500) {
                this.speakTexts("This button can let you set the voice mode. " +
                    "If you want to use this function, please click it again immediately.");
                d = new Date();
                this.state.lastClickTime = d.getTime();
            }else {
                this.setVoice();
                d = new Date();
                this.state.lastClickTime = d.getTime();
            }
        }
    }



    render() {
        return (
            <div>
                <Button variant="primary" size="lg" block onClick={this.handleClick}>
                    Voice Mode
                </Button>
            </div>
        );
    }
}