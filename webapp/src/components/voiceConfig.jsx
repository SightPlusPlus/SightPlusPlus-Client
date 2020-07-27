import React, {Component} from "react";
import { Button, Modal, Container, Row, Col, Form} from 'react-bootstrap';

export default class VoiceConfig extends Component {

    constructor(props) {
        super(props);
        this.state = {
            vConfig: null,
        }

        //binding
        this.setVoice = this.setVoice.bind(this);
        this.recogniseSpeech = this.recogniseSpeech.bind(this);
        this.speakTexts = this.speakTexts.bind(this);
    }

    recogniseSpeech(){
        console.log('recogniseSpeech');
        var speechConfig = window.SpeechSDK.SpeechConfig.fromSubscription('1a040caa836848b88501c48411a0b2c1', 'westus');
        speechConfig.speechRecognitionLanguage = "en-US";

        var audioConfig  = window.SpeechSDK.AudioConfig.fromDefaultMicrophoneInput();
        //console.log('start');
        var recogniser = new window.SpeechSDK.SpeechRecognizer(speechConfig, audioConfig);

        recogniser.recognizeOnceAsync( result => {
            console.log(result.text);
            this.state.vConfig = result.text;
            //value = result.text;
            this.speakTexts(`Hello, your preference is ${this.state.vConfig}`);
        },err => {
            console.log(err);
        });
    }

    speakTexts(texts) {
        console.log('speakText');
        var synth = window.speechSynthesis;
        var voices = synth.getVoices();//get language lists

        var utterThis = new SpeechSynthesisUtterance(texts); // text content
        utterThis.voice = voices[2]; // choose the language type(en-GB)

        utterThis.pitch = 1;// pitch
        utterThis.rate = 1;// rate

        synth.speak(utterThis); //speak
    }

    setVoice() {
        this.speakTexts('Please say your preferred language, rate and pitch after three d sound. d d d');
        setTimeout(this.recogniseSpeech, 8000);
        //this.speakTexts(`Hello, your preference is ${this.state.vConfig}`);
    }



    render() {
        return (
            <div>
                <Button variant="primary" size="lg" block onClick={this.setVoice}>
                    Start Voice Configuration
                </Button>
            </div>
        );
    }
}