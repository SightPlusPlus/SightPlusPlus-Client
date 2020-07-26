import React, {Component} from "react";
import {Button} from "react-bootstrap";

export default class SttExample extends Component {

    constructor(props) {
        super(props);

        //binding
        this.speechRecognise = this.speechRecognise.bind(this);
    }

    speechRecognise() {
        var phraseDiv;
        var startRecognizeOnceAsyncButton;

        // subscription key and region for speech services.
        var subscriptionKey, serviceRegion;
        var authorizationToken;
        var SpeechSDK;
        var recognizer;

        document.addEventListener("DOMContentLoaded", function () {
            startRecognizeOnceAsyncButton = document.getElementById("startRecognizeOnceAsyncButton");
            subscriptionKey = document.getElementById("subscriptionKey");
            serviceRegion = document.getElementById("serviceRegion");
            phraseDiv = document.getElementById("phraseDiv");

            startRecognizeOnceAsyncButton.addEventListener("click", function () {
                startRecognizeOnceAsyncButton.disabled = true;
                phraseDiv.innerHTML = "";

                // if we got an authorization token, use the token. Otherwise use the provided subscription key
                var speechConfig;
                if (authorizationToken) {
                    speechConfig = SpeechSDK.SpeechConfig.fromAuthorizationToken(authorizationToken, serviceRegion.value);
                } else {
                    if (subscriptionKey.value === "" || subscriptionKey.value === "subscription") {
                        alert("Please enter your Microsoft Cognitive Services Speech subscription key!");
                        return;
                    }
                    speechConfig = SpeechSDK.SpeechConfig.fromSubscription(subscriptionKey.value, serviceRegion.value);
                }

                speechConfig.speechRecognitionLanguage = "en-US";
                var audioConfig  = SpeechSDK.AudioConfig.fromDefaultMicrophoneInput();
                recognizer = new SpeechSDK.SpeechRecognizer(speechConfig, audioConfig);

                recognizer.recognizeOnceAsync(
                    function (result) {
                        startRecognizeOnceAsyncButton.disabled = false;
                        phraseDiv.innerHTML += result.text;
                        window.console.log(result);

                        recognizer.close();
                        recognizer = undefined;
                    },
                    function (err) {
                        startRecognizeOnceAsyncButton.disabled = false;
                        phraseDiv.innerHTML += err;
                        window.console.log(err);

                        recognizer.close();
                        recognizer = undefined;
                    });
            });

            if (!!window.SpeechSDK) {
                SpeechSDK = window.SpeechSDK;
                startRecognizeOnceAsyncButton.disabled = false;

                document.getElementById('content').style.display = 'block';
                document.getElementById('warning').style.display = 'none';

            }
        });
    }




    componentDidMount() {
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.async = true;
        script.src = '../microSTT/microsoft.cognitiveservices.speech.sdk.bundle.js';
        document.head.appendChild(script);
    }


    render() {
        return (

            <div id="content" style="display:none">
                <table width="100%">
                <tr>
                    <td></td>
                    <td><h1 style="font-weight:500;">Microsoft Cognitive Services Speech SDK JavaScript Quickstart</h1></td>
                </tr>
                <tr>
                    <td align="right"><a href="https://docs.microsoft.com/azure/cognitive-services/speech-service/get-started" target="_blank">Subscription</a>:</td>
                    <td><input id="subscriptionKey" type="text" size="40" value="subscription"/></td>
                </tr>
                <tr>
                    <td align="right">Region</td>
                    <td><input id="serviceRegion" type="text" size="40" value="YourServiceRegion"/></td>
                </tr>
                <tr>
                    <td></td>
                    <td><button id="startRecognizeOnceAsyncButton">Start recognition</button></td>
                </tr>
                <tr>
                    <td align="right" valign="top">Results</td>
                    <td><textarea id="phraseDiv" style="display: inline-block;width:500px;height:200px"></textarea></td>
                </tr>
                </table>
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
