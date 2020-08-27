import React, {Component} from "react";
import { Button} from 'react-bootstrap';

export default class MuteVoices extends Component {

    constructor(props) {
        super(props);
        this.state = {
            synth: null,
            muteFlag: false,
            preClickTime: null,
            postClickTime: null
        };

        //binding
        this.obtainVoices = this.obtainVoices.bind(this);
        this.speakTexts = this.speakTexts.bind(this);
        this.muteAllVoices = this.muteAllVoices.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.resumeAllVoices = this.resumeAllVoices.bind(this);
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
        //speechSynthesis.speak(utterThis);
    }

    muteAllVoices () {
        let muteFlag = true;
        this.props.muteVoice(muteFlag);
    }

    resumeAllVoices () {
        console.log("resume");
        this.state.synth.resume();
    }


    handleClick () {
        if (this.state.muteFlag === false) {
            this.muteAllVoices();
            this.setState({
                muteFlag: true
            });
        }else {
            this.resumeAllVoices();
            this.setState({
                muteFlag: false
            });
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