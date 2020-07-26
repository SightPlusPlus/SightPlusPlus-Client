import React, {Component} from "react";
import {Button} from "react-bootstrap";
import ReactDependentScript from 'react-dependent-script';


export default class Stt extends Component {

    constructor(props) {
        super(props);

        //binding
        this.speechRecognise = this.speechRecognise.bind(this);
    }

    // speechRecognise() {
    //     var sdk = require("microsoft-cognitiveservices-speech-sdk");
    //     console.log(sdk);
    //     var audioConfig = sdk.AudioConfig.fromDefaultMicrophoneInput();
    //     console.log(audioConfig);
    //     var speechConfig = sdk.SpeechConfig.fromSubscription('1a040caa836848b88501c48411a0b2c1', 'westus');
    //     // // setting the recognition language to English.
    //     speechConfig.speechRecognitionLanguage = "en-UK";
    //     console.log(speechConfig);
    //
    //     // // create the speech recognizer.
    //     var recognizer = new sdk.SpeechRecognizer(speechConfig, audioConfig);
    //     console.log(recognizer);
    //
    //     // start the recognizer and wait for a result.
    //     recognizer.recognizeOnceAsync(
    //         function (result) {
    //             console.log(result);
    //
    //             recognizer.close();
    //             //recognizer = undefined;
    //         },
    //         function (err) {
    //             console.trace("err - " + err);
    //
    //             recognizer.close();
    //             //recognizer = undefined;
    //         });
    // }

    speechRecognise(){
        // var script = document.createElement('script');
        // script.type = 'text/javascript';
        // script.async = true;
        // script.src = 'https://cdn.jsdelivr.net/npm/microsoft-cognitiveservices-speech-sdk@latest/distrib/lib/microsoft.cognitiveservices.speech.sdk.min.js';
        // document.head.appendChild(script);

        var speechConfig = window.SpeechSDK.SpeechConfig.fromAuthorizationToken('1a040caa836848b88501c48411a0b2c1', 'westus');
        console.log(speechConfig);
        speechConfig.speechRecognitionLanguage = "en-UK";
        var audioConfig  = window.SpeechSDK.AudioConfig.fromDefaultMicrophoneInput();
        var recognizer = new window.SpeechSDK.SpeechRecognizer(speechConfig, audioConfig);
        recognizer.recognizeOnceAsync(result => {
            console.log(result);
        });
    }




    componentDidMount() {

    }


    render() {
        return (
            <div>

                    <Button variant="primary" size="lg" block onClick={this.speechRecognise}>
                        Voice Configuration
                    </Button>

            </div>
        );
    }
}



// var recognition = new window.SpeechRecognition();
// var speechRecognitionList = new window.SpeechGrammarList();
//
// recognition.grammars = speechRecognitionList;
// recognition.continuous = false;
// recognition.lang = 'en-UK';
// recognition.interimResults = false;
// recognition.maxAlternatives = 1;
//
// recognition.start();
//
//
// recognition.onresult = function(event) {
//     var color = event.results[0][0].transcript;
//     console.log(color);
// }



// var script = document.createElement('script');
// script.type = 'text/javascript';
// script.async = true;
// script.src = '../microSTT/microsoft.cognitiveservices.speech.sdk.bundle.js';
// document.head.appendChild(script);
