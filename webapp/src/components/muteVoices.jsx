import React, {Component} from "react";
import { Button} from 'react-bootstrap';

export default class MuteVoices extends Component {

    constructor(props) {
        super(props);
        this.state = {
            //synth: null,
            muteFlag: false
        };

        //binding
        //this.obtainVoices = this.obtainVoices.bind(this);
        //this.speakTexts = this.speakTexts.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
        // obtain the language lists
        // this.obtainVoices();
        // if (speechSynthesis.onvoiceschanged !== undefined) {
        //     speechSynthesis.onvoiceschanged = this.obtainVoices;
        // }

    }

    // obtainVoices() {
    //     this.state.synth = window.speechSynthesis;
    //     this.state.voiceList = this.state.synth.getVoices();
    // }
    //
    // speakTexts(text) {
    //     var utterThis = new SpeechSynthesisUtterance(text); // text content
    //     utterThis.onerror = function (event) {
    //         console.error('SpeechSynthesisUtterance.onerror');
    //     }
    //     utterThis.voice = this.state.voiceList[2]; // choose the language type(en-GB)
    //     utterThis.rate = 2;// rate
    //     utterThis.pitch = 1.5;// pitch
    //     this.state.synth.speak(utterThis);//speak
    //     //speechSynthesis.speak(utterThis);
    // }


    handleClick () {
        if (window.speechSynthesis.speaking === true) {
            var muteFlag = true;
            this.props.muteVoice(muteFlag);
        }else {
            var muteFlag = false;
            this.props.muteVoice(muteFlag);
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