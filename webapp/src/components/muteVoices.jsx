import React, {Component} from "react";
import { Button} from 'react-bootstrap';

export default class MuteVoices extends Component {

    constructor(props) {
        super(props);
        this.state = {
            preClickTime: null,
            postClickTime: null
        };

        //binding
        this.speakTexts = this.speakTexts.bind(this);
        this.muteAllVoices = this.muteAllVoices.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    speakTexts(texts) {
        var synth = window.speechSynthesis;
        var voices = synth.getVoices();//get language lists

        var utterThis = new SpeechSynthesisUtterance(texts); // text content
        utterThis.voice = voices[2]; // choose the language type(en-GB)
        utterThis.pitch = 2;// pitch
        utterThis.rate = 1.5;// speed

        synth.speak(utterThis); //speak
    }

    muteAllVoices = () => {
        let muteFlag = true;
        this.props.muteVoice(muteFlag);
    }


    handleClick () {
        if (this.state.preClickTime == null) {
            console.log("first click");
            var d = new Date();
            this.state.preClickTime = d.getTime();
            this.speakTexts("This button can let you mute all the sounds. If you want to use this function, please click it again immediately..");
        }else{
            console.log("second click");
            var d = new Date();
            this.state.postClickTime = d.getTime();
            if(this.state.postClickTime - this.state.preClickTime > 15000) {
                this.setState({
                    preClickTime: null,
                    postClickTime: null
                });
            }else {
                this.speakTexts("Sounds muted.");
                this.muteAllVoices();
                this.setState({
                    preClickTime: null,
                    postClickTime: null
                });
            }
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