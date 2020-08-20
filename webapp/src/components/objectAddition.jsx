import React, {Component} from "react";
import { Button} from 'react-bootstrap';

export default class ObjectAddition extends Component {

    constructor(props) {
        super(props);
        this.state = {
            preClickTime: null,
            postClickTime: null
        };

        //binding
        this.recogniseSpeech = this.recogniseSpeech.bind(this);
        this.speakTexts = this.speakTexts.bind(this);
        this.setObjects = this.setObjects.bind(this);
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
            var objects = result.text.split(' ');

            this.props.setExtraObject(objects);
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


    setObjects() {
        this.speakTexts('Hello, in this system, you can mark the objects you preferred by speaking... Now, please say the name of your preferred objects. after three d sound. d d d');
        setTimeout(this.recogniseSpeech, 10000);
    }


    handleClick () {
        if (this.state.preClickTime == null) {
            console.log("first click");
            var d = new Date();
            this.state.preClickTime = d.getTime();
            this.speakTexts("This button can let you set the preferred objects which you would like to know first. If you want to use this function, please click it again immediately..");
        }else{
            console.log("second click");
            var d = new Date();
            this.state.postClickTime = d.getTime();
            if(this.state.postClickTime - this.state.preClickTime > 8000) {
                this.state.preClickTime = null;
                this.state.postClickTime = null;
            }else {
                this.setObjects();
                this.state.preClickTime = null;
                this.state.postClickTime = null;
            }
        }
    }



    render() {
        return (
            <div>
                <Button  variant="primary" size="lg" block onClick={this.setObjects}>
                    Mark Preferred Objects
                </Button>
            </div>
        );
    }
}