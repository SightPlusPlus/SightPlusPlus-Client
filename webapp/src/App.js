import React from 'react';
import './Page.css';
import Navigation from "./components/navigation";
import VoiceConfig from "./components/voiceConfig";
import ObjectAddition from "./components/objectAddition";
import MuteVoices from "./components/muteVoices";
import alllogos from "./images/alllogos.png";



export default class App extends React.Component{

  constructor(props){
    super(props);
    this.state = {
        voiceProps: [],
        objects: [],
        muteFlag: false,
        cButton: false,
        resumeFlag: false
    };

    this.setVoiceProps = this.setVoiceProps.bind(this);
    this.setExtraObject = this.setExtraObject.bind(this);
    this.muteVoice = this.muteVoice.bind(this);
    this.changeButton = this.changeButton.bind(this);
    this.resumeMuteFlag = this.resumeMuteFlag.bind(this);
  }

  setVoiceProps = (voiceProps) => {
      this.setState({
          muteFlag: 0,
          voiceProps: voiceProps,
          cButton: false,
          resumeFlag: false
      });
  }

  setExtraObject = (objects) => {
      this.setState({
          muteFlag: 0,
          objects: objects,
          cButton: false,
          resumeFlag: false
      });
  }

  muteVoice = (muteFlag) => {
      this.setState({
          muteFlag: muteFlag,
          cButton: false,
          resumeFlag: false
      });
  }

  changeButton = () => {
      this.setState({
          muteFlag: 0,
          cButton: true,
          resumeFlag: false
      });
  }

  resumeMuteFlag = () => {
      this.setState({
          resumeFlag: true
      });
  }




    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <h1>Sight ++</h1>
                    <Navigation voiceProps={this.state.voiceProps} objects={this.state.objects} muteFlag={this.state.muteFlag} cButton={this.state.cButton} resumeMuteFlag={this.resumeMuteFlag}/>
                    <br/>
                    <MuteVoices muteVoice={this.muteVoice} resumeFlag={this.state.resumeFlag}/>
                    <br/>
                    <VoiceConfig setVoiceProps={this.setVoiceProps} changeButton={this.changeButton}  muteFlag={this.state.muteFlag}/>
                    <br/>
                    <ObjectAddition setExtraObject={this.setExtraObject} changeButton={this.changeButton} muteFlag={this.state.muteFlag} />
                    <br/>
                    <img src={alllogos} width="180" height="60" />
                </header>
            </div>
        );
    }

}