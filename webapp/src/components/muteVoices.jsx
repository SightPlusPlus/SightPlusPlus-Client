import React, {Component} from "react";
import { Button} from 'react-bootstrap';

export default class MuteVoices extends Component {

    constructor(props) {
        super(props);
        this.state = {
            lang: null,
            muteFlag: false,
            voiceList: null
        };

        //binding
        this.obtainVoices = this.obtainVoices.bind(this);
        this.initialiseVoice = this.initialiseVoice.bind(this);
        this.speakTexts = this.speakTexts.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
        // obtain the language lists
        if (window.speechSynthesis !== undefined) {
            this.obtainVoices();
            if (window.speechSynthesis.onvoiceschanged !== undefined) {
                window.speechSynthesis.onvoiceschanged = this.obtainVoices;
            }
        }else {
            console.log("cannot use speech APIs");
        }

    }

    obtainVoices() {
        this.state.voiceList = window.speechSynthesis.getVoices();
    }

    initialiseVoice () {
        var donotfindGB = true;
        this.state.voiceList.forEach((item,index) => {
            if (item.lang === "en-GB" && donotfindGB ) {
                this.state.lang = index;
                donotfindGB = false;
            }
        })
    }


    speakTexts(text) {
        var utterThis = new SpeechSynthesisUtterance(text); // text content
        utterThis.onerror = function (event) {
            console.error('SpeechSynthesisUtterance.onerror');
        }
        utterThis.voice = this.state.voiceList[this.state.lang]; // choose the language type(en-GB)
        utterThis.rate = 2;// rate
        utterThis.pitch = 1.5;// pitch
        window.speechSynthesis.speak(utterThis);//speak
    }


    handleClick () {
        if (this.state.lang === null) {
            this.componentDidMount();
            this.initialiseVoice();
        }

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
                utterThis.voice = self.state.voiceList[self.state.lang]; // choose the language type(en-GB)
                utterThis.rate = 2;// rate
                utterThis.pitch = 1.5;// pitch
                window.speechSynthesis.speak(utterThis);//speak
            }, 500);
        }else {
            var muteFlag = false;
            this.state.muteFlag = false;
            this.props.muteVoice(muteFlag);
            if (window.speechSynthesis.speaking === true) {
                window.speechSynthesis.cancel();
            }
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