import React, {Component} from "react";

export default class Ttsexample extends Component {

    constructor(props) {
        super(props);

        //binding
        this.speakText = this.speakText.bind(this);
    }


    speakText() {
        var synth = window.speechSynthesis;
        var voices = synth.getVoices();//get language lists
        var count = 0;
        console.log(voices);

        var utterThis = new SpeechSynthesisUtterance('hello, we are sight ++!'); // text content
        utterThis.voice = voices[2]; // choose the language type(en-GB)
        console.log(utterThis.voice);

        utterThis.pitch = 1;// pitch
        utterThis.rate = 1;// rate

        synth.speak(utterThis); //speak
        count = count +1;
        console.log(count);
    }

    componentDidMount() {
       this.speakText();
    }


    render() {
        return (
            <div>
                <h1> TTSExample </h1>
            </div>
        );
    }
}







// var synth = window.speechSynthesis;
// var voices = [];
// var count = 0;
//
//
// function myTextToSpeech() {
//     voices = synth.getVoices(); //get language lists
//     console.log(voices);
//
//     var utterThis = new SpeechSynthesisUtterance('hello we are sight + + group!'); // text content
//     utterThis.voice = voices[2]; // choose the language type(en-GB)
//     console.log(utterThis.voice);
//
//     utterThis.pitch = 1;// pitch
//     utterThis.rate = 1;// rate
//
//     synth.speak(utterThis); //speak
//     count = count +1;
//     console.log(count);
// }
//
//
// myTextToSpeech();
// if (speechSynthesis.onvoiceschanged !== undefined) {
//     speechSynthesis.onvoiceschanged = myTextToSpeech;
// }
