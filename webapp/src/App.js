import React from 'react';
import './Page.css';
import Navigation from "./components/navigation";
import VoiceConfig from "./components/voiceConfig";
import ObjectAddition from "./components/objectAddition";
import MuteVoices from "./components/muteVoices";



export default class App extends React.Component{

  constructor(props){
    super(props);
    this.state = {
        voiceProps: [],
        objects: [],
        muteFlag: false,
        cButton: false
    };

    this.setVoiceProps = this.setVoiceProps.bind(this);
    this.setExtraObject = this.setExtraObject.bind(this);
    this.muteVoice = this.muteVoice.bind(this);
    this.changeButton = this.changeButton.bind(this);
  }

  setVoiceProps = (voiceProps) => {
      this.setState({
          muteFlag: 0,
          voiceProps: voiceProps,
          cButton: false
      });
  }

  setExtraObject = (objects) => {
      this.setState({
          muteFlag: 0,
          objects: objects,
          cButton: false
      });
  }

  muteVoice = (muteFlag) => {
      this.setState({
          muteFlag: muteFlag,
          cButton: false
      });
  }

  changeButton = () => {
      this.setState({
          muteFlag: 0,
          cButton: true
      });
  }




  render() {
    return (
        <div className="App">
            <header className="App-header">
                <h1>Sight ++</h1>
                <Navigation voiceProps={this.state.voiceProps} objects={this.state.objects} muteFlag={this.state.muteFlag} cButton={this.state.cButton}/>
                <br/>
                <MuteVoices muteVoice={this.muteVoice} />
                <br/>
                <VoiceConfig setVoiceProps={this.setVoiceProps} changeButton={this.changeButton} muteFlag={this.state.muteFlag}/>
                <br/>
                <ObjectAddition setExtraObject={this.setExtraObject} changeButton={this.changeButton} muteFlag={this.state.muteFlag}/>
            </header>
        </div>
    );
  }

}

// <Navigation voiceProps={this.state.voiceProps}/>
// <VoiceConfig setVoice={this.setVoice}/>


// <Switch>
//     <Route exact path="/">
//         <App />
//     </Route>
//     <Route path="/navigation">
//         <Navigation />
//     </Route>
//     <Route path="/voiceConfig">
//         <VoiceConfig/>
//     </Route>
// </Switch>




// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }
//
// export default App;



// <div className="body">
//     <header className="App-header">
//         <div className="man-user-jumbotron">
//             <div className="reset-form-title">Sight ++</div>
//             <br/>
//             <Navigation/>
//             <br/>
//         </div>
//     </header>
// </div>
