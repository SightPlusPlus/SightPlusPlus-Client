import React, {Component} from "react";
import { Button} from 'react-bootstrap';

export default class MuteVoices extends Component {

    constructor(props) {
        super(props);
        this.state = {
            synth: null,
            muteFlag: false
        };

        //binding
        this.obtainVoices = this.obtainVoices.bind(this);
        this.speakTexts = this.speakTexts.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
        // obtain the language lists
        this.obtainVoices();
        if (speechSynthesis.onvoiceschanged !== undefined) {
            speechSynthesis.onvoiceschanged = this.obtainVoices;
        }

    }

    obtainVoices() {
        this.state.synth = window.speechSynthesis;
        this.state.voiceList = this.state.synth.getVoices();
    }

    speakTexts(text) {
        var utterThis = new SpeechSynthesisUtterance(text); // text content
        utterThis.onerror = function (event) {
            console.error('SpeechSynthesisUtterance.onerror');
        }
        utterThis.voice = this.state.voiceList[2]; // choose the language type(en-GB)
        utterThis.rate = 2;// rate
        utterThis.pitch = 1.5;// pitch
        this.state.synth.speak(utterThis);//speak
    }


    handleClick () {
        if(this.state.muteFlag === false) {
            var muteFlag = true;
            this.state.muteFlag = true;
            this.props.muteVoice(muteFlag);
            var self = this;
            setTimeout(function() {
                self.obtainVoices();
                if (speechSynthesis.onvoiceschanged !== undefined) {
                    speechSynthesis.onvoiceschanged = self.obtainVoices;
                }
                var utterThis = new SpeechSynthesisUtterance("Sounds are muted. If you want to resume the sound, please click this button again."); // text content
                utterThis.onerror = function (event) {
                    console.error('SpeechSynthesisUtterance.onerror');
                }
                utterThis.voice = self.state.voiceList[2]; // choose the language type(en-GB)
                utterThis.rate = 2;// rate
                utterThis.pitch = 1.5;// pitch
                self.state.synth.speak(utterThis);//speak
            }, 500);
        }else {
            var muteFlag = false;
            this.state.muteFlag = false;
            this.props.muteVoice(muteFlag);
            this.speakTexts("Sounds are resumed. ");
        }

    }


    render() {
        return (
            <div>
                <Button  variant="primary" size="lg" block onClick={this.handleClick}>
                    Mute
                </Button>
            </div>
        );
    }

}