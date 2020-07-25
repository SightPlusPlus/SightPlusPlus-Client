import React, {Component} from "react";
import Button from 'react-bootstrap/Button';

export default class Navigation extends Component {

    constructor(props) {
        super(props);
        this.state = {
            voiceList: null,
        };

        //binding
        this.speakTexts = this.speakTexts.bind(this);
        this.obtainVoices = this.obtainVoices.bind(this);
        this.startNavigation = this.startNavigation.bind(this);
    }



    // receive info using websocket to start navigation
    obtainVoices() {
        this.state.voiceList = window.speechSynthesis.getVoices();
    }



    speakTexts() {
        var utterThis = new SpeechSynthesisUtterance('white big car!'); // text content
        utterThis.onerror = function (event) {
            console.error('SpeechSynthesisUtterance.onerror');
        }
        utterThis.voice = this.state.voiceList[2]; // choose the language type(en-GB)
        utterThis.pitch = 1;// pitch
        utterThis.rate = 1;// rate
        speechSynthesis.speak(utterThis); //speak
    }


    startNavigation() {
        console.log(this.state.voiceList);
        //speak
        this.speakTexts();
    }





    componentDidMount() {
        // obtain the language lists
        this.obtainVoices();
        if (speechSynthesis.onvoiceschanged !== undefined) {
            speechSynthesis.onvoiceschanged = this.obtainVoices;
            console.log(this.state.voiceList);
        }

    }




    render() {
        return (
            <div>
                <h1>We are navigating for you.</h1>
                <button type="button" className="btn btn-primary">Primary</button>
                <button onClick={this.startNavigation}>
                    Start
                </button>
            </div>
        );
    }
}




// var ifObtained = setInterval(()=> {
//     console.log(voices);
//     console.log(Object.keys(voices).length);
//
//     if (Object.keys(voices).length != 0) {
//         clearInterval(ifObtained);
//     }
// }, 2000);