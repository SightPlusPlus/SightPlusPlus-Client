import React, {Component} from "react";
import { Button, Modal, Container, Row, Col, Form} from 'react-bootstrap';

export default class VoiceConfig extends Component {

    constructor(props) {
        super(props);
        this.state = {
            vConfig: null,
            voiceProps: null,
        }

        //binding
        this.setVoice = this.setVoice.bind(this);
        this.speakTexts = this.speakTexts.bind(this);
        this.recogniseSpeech = this.recogniseSpeech.bind(this);
    }

    recogniseSpeech(){
        var speechConfig = window.SpeechSDK.SpeechConfig.fromSubscription('1a040caa836848b88501c48411a0b2c1', 'westus');
        speechConfig.speechRecognitionLanguage = "en-US";
        var audioConfig  = window.SpeechSDK.AudioConfig.fromDefaultMicrophoneInput();
        var recogniser = new window.SpeechSDK.SpeechRecognizer(speechConfig, audioConfig);

        recogniser.recognizeOnceAsync( result => {
            console.log(result.text);
            this.state.vConfig = result.text;
            //value = result.text;
            this.speakTexts(`Your preference is ${this.state.vConfig}. This will be applied to your voice navigation service.`);

            let langu = 1;//2 for British eng, 1 for American eng
            let speed = 1;
            let pitch = 1;
            let voiceProps = {langu, speed, pitch};
            this.props.setVoice(voiceProps);
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
        utterThis.rate = 0.75;// rate

        synth.speak(utterThis); //speak
    }



    setVoice() {
        this.speakTexts('Hello, in this system, you can choose British English or American English... You can also set the rate and pitch of the voice. The recommended voice rate and pitch are both 1...' +
            'You can set these items by speaking.. For example, if you choose British English, please say your preference in this form... ' +
            'British English, rate 1, pitch 1.. Now, please say your preferred language, rate and pitch. after three d sound. d d d');
        setTimeout(this.recogniseSpeech, 40000);
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