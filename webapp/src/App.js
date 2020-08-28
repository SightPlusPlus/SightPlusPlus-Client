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
        stopId: null,
    };

    this.setVoiceProps = this.setVoiceProps.bind(this);
    this.setExtraObject = this.setExtraObject.bind(this);
    this.muteVoice = this.muteVoice.bind(this);
    this.stopAll = this.stopAll.bind(this);
  }

  setVoiceProps = (voiceProps) => {
      this.setState({
          muteFlag: false,
          voiceProps: voiceProps
      });
  }

  setExtraObject = (objects) => {
      this.setState({
          muteFlag: false,
          objects: objects
      });
  }

  muteVoice = (muteFlag) => {
      this.setState({
          muteFlag: muteFlag
      });
  }

  stopAll= (compoId) => {
      this.setState({
          stopId: compoId
      });
  }


  render() {
    return (
        <div className="App">
            <header className="App-header">
                <h1>Sight ++</h1>
                <MuteVoices muteVoice={this.muteVoice} />
                <br/>
                <Navigation voiceProps={this.state.voiceProps} objects={this.state.objects} muteFlag={this.state.muteFlag} />
                <br/>
                <VoiceConfig setVoiceProps={this.setVoiceProps} stopFlag={this.state.stopId} />
                <br/>
                <ObjectAddition setExtraObject={this.setExtraObject} stopAll={this.stopAll} />
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
