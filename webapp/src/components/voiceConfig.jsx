import React, {Component} from "react";
import { Button} from 'react-bootstrap';

export default class VoiceConfig extends Component {

    constructor(props) {
        super(props);
        this.state = {
            preClickTime: null,
            postClickTime: null
        };

        //binding
        this.setVoice = this.setVoice.bind(this);
        this.speakTexts = this.speakTexts.bind(this);
        this.recogniseSpeech = this.recogniseSpeech.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    recogniseSpeech(){
        var speechConfig = window.SpeechSDK.SpeechConfig.fromSubscription('089ccb86c773418db9cf38d11833f5a0', 'westus');
        speechConfig.speechRecognitionLanguage = "en-US";
        var audioConfig  = window.SpeechSDK.AudioConfig.fromDefaultMicrophoneInput();
        var recogniser = new window.SpeechSDK.SpeechRecognizer(speechConfig, audioConfig);

        recogniser.recognizeOnceAsync( result => {
            console.log(result.text);
            this.speakTexts(`Your preference is ${result.text}. This will be applied to your voice navigation service.`);
            var str = result.text.split(' ');
            var langu;
            var speed;
            var pitch;
            //set language 2 for British eng, 1 for American eng
            if(str[0] === "British") {
                langu = 2;
            }else {
                langu = 1;
            }

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

            let voiceProps = {langu, speed, pitch};
            this.props.setVoiceProps(voiceProps);
        },err => {
            console.log(err);
        });

    }

    speakTexts(texts) {
        var synth = window.speechSynthesis;
        var voices = synth.getVoices();//get language lists

        var utterThis = new SpeechSynthesisUtterance(texts); // text content
        utterThis.voice = voices[2]; // choose the language type(en-GB)

        utterThis.pitch = 1;// pitch
        utterThis.rate = 0.75;// speed

        synth.speak(utterThis); //speak
    }



    setVoice() {
        this.speakTexts('Hello, in this system, you can choose British English or American English... You can also set the speed and pitch of the voice. The recommended voice speed and pitch are both 1.5...' +
        'But you can still set them by speaking… For example, if you choose British English and a lower speed and pitch, both of them are 1, please say your preference in this form... British English, speed 1, pitch 1..' +
         'Now, please say your preferred language, speed and pitch. after three d sound. d d d');
        setTimeout(this.recogniseSpeech, 40000);
    }



    handleClick () {
        if (this.state.preClickTime == null) {
            console.log("first click");
            var d = new Date();
            this.state.preClickTime = d.getTime();
            this.speakTexts("This button can let you set the voice mode. If you want to use this function, please click it again immediately.");
        }else{
            console.log("second click");
            var d = new Date();
            this.state.postClickTime = d.getTime();
            if(this.state.postClickTime - this.state.preClickTime > 8000) {
                this.state.preClickTime = null;
                this.state.postClickTime = null;
            }else {
                this.setVoice();
                this.state.preClickTime = null;
                this.state.postClickTime = null;
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