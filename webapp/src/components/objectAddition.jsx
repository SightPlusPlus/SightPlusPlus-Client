import React, {Component} from "react";
import { Button} from 'react-bootstrap';

export default class ObjectAddition extends Component {

    constructor(props) {
        super(props);

        //binding
        this.recogniseSpeech = this.recogniseSpeech.bind(this);
        this.speakTexts = this.speakTexts.bind(this);
        this.setObjects = this.setObjects.bind(this);

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
        this.speakTexts('Hello, in this system, you can .. Now, please say your preferred language, speed and pitch. after three d sound. d d d');
        setTimeout(this.recogniseSpeech, 40000);
    }





    render() {
        return (
            <div>
                <Button variant="primary" size="lg" block onClick={this.setObjects}>
                    Add Extra Objects
                </Button>
            </div>
        );
    }
}