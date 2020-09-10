import React, {Component} from "react";
import { Button} from 'react-bootstrap';

export default class VoiceConfig extends Component {

    constructor(props) {
        super(props);
        this.state = {
            lang: null,
            speed: 2,
            pitch: 1.5,
            langGB: null,
            langUS: null,
            utterThis: null,
            voiceList: null,
            lastClickTime: null
        };

        //binding
        this.obtainVoices = this.obtainVoices.bind(this);
        this.initialiseVoice = this.initialiseVoice.bind(this);
        this.setVoice = this.setVoice.bind(this);
        this.speakTexts = this.speakTexts.bind(this);
        this.recogniseSpeech = this.recogniseSpeech.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.checkValidation = this.checkValidation.bind(this);
    }

    componentDidMount() {
        // obtain the language lists
        var self = this;
        if (window.speechSynthesis !== undefined) {
            this.obtainVoices();
            if (speechSynthesis.onvoiceschanged !== undefined) {
                speechSynthesis.onvoiceschanged = this.obtainVoices;
            }
        }else {
            console.log("cannot use speech APIs");
        }

    }


    async componentWillReceiveProps(newProps) {
        //mute
        if (newProps.muteFlag === true) { // mute
            if (window.speechSynthesis.speaking === true) {
                window.speechSynthesis.cancel();
            }
        }
    }



    obtainVoices() {
        this.state.voiceList = window.speechSynthesis.getVoices();
    }



    initialiseVoice () {
        var donotfindGB = true;
        var donotfindUS = true;
        this.state.voiceList.forEach((item,index) => {
            if (item.lang === "en-GB" && donotfindGB ) {
                this.state.langGB = index;
                donotfindGB = false;
            }

            if (item.lang === "en-US" && donotfindUS ) {
                this.state.langUS = index;
                donotfindUS = false;
            }
        })
        this.state.lang = this.state.langGB;
        console.log("VoiceConfig " + this.state.lang);
    }


    checkValidation(str) {
        var lang;
        var speed;
        var pitch;
        var checkLang = 0;
        var checkSpeed = 0;
        var checkPitch = 0;

        //set language 2 for British eng, 1 for American eng

        if (str[0] === "British" || str[0] === "American") {
            if(str[0] === "British") {
                lang = this.state.langGB;
                this.state.lang = this.state.langGB;
            }else {
                lang = this.state.langUS;
                this.state.lang = this.state.langUS;
            }
        }else {
            checkLang = 1;
        }
        console.log("lang = " + lang);

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
        if (checkLang === 0 && checkSpeed === 0 && checkPitch === 0) {
            let voiceProps = {lang, speed, pitch};
            return voiceProps;
        }


        //Invalid Input
        //invalid language type
        if (checkLang === 1) {
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
                var s1 = str[5].split('');
                var s2 = [];
                if(s1[s1.length-1] === '.') {
                    s1.pop();
                    str.pop();
                    s2 = s1.join('');
                    str.push(s2);
                }

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
        this.state.utterThis.voice = this.state.voiceList[this.state.lang]; // choose the language type(en-GB)
        this.state.utterThis.rate = this.state.speed;// rate
        this.state.utterThis.pitch = this.state.pitch;// pitch
        window.speechSynthesis.speak(this.state.utterThis);//speak
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
        this.state.utterThis.voice = this.state.voiceList[this.state.lang]; // choose the language type(en-GB)
        this.state.utterThis.rate = this.state.speed;// rate
        this.state.utterThis.pitch = this.state.pitch;// pitch
        window.speechSynthesis.speak(this.state.utterThis);//speak
        var self = this;
        this.state.utterThis.onend = function(event) {
            self.recogniseSpeech();
        }
    }



    handleClick () {
        if (this.state.lang === null) {
            this.componentDidMount();
            this.initialiseVoice();
        }
        console.log(this.state.langUS);

        if(this.state.lastClickTime === null ) {
            var d = new Date();
            this.state.lastClickTime = d.getTime();
            this.props.changeButton();
            if (window.speechSynthesis.speaking === true) {
                window.speechSynthesis.cancel();
            }
            this.speakTexts("This button can let you set the voice mode. " +
                "If you want to use this function, please click it again immediately.");
        }else {
            var d = new Date();
            var duration = d.getTime() - this.state.lastClickTime;

            if (duration > 8500) {
                this.props.changeButton();
                if (window.speechSynthesis.speaking === true) {
                    window.speechSynthesis.cancel();
                }
                this.speakTexts("This button can let you set the voice mode. " +
                    "If you want to use this function, please click it again immediately.");
                d = new Date();
                this.state.lastClickTime = d.getTime();
            }else {
                if (window.speechSynthesis.speaking === true) {
                    window.speechSynthesis.cancel();
                }
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