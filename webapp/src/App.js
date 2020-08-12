import React from 'react';
import './Page.css';
import Navigation from "./components/navigation";
import VoiceConfig from "./components/voiceConfig";
import ObjectAddition from "./components/objectAddition";



export default class App extends React.Component{

  constructor(props){
    super(props);
    this.state = {
        voiceProps: [],
        objects: []
    };

    this.setVoiceProps = this.setVoiceProps.bind(this);
    this.setExtraObject = this.setExtraObject.bind(this);
  }

  setVoiceProps = (voiceProps) => {
      this.setState({ voiceProps: voiceProps});
  }

  setExtraObject = (objects) => {
      this.setState({ objects: objects});
  }

  render(){
    return (
        <div className="App">
            <header className="App-header">
                <h1>Sight ++</h1>
                <Navigation voiceProps={this.state.voiceProps} objects={this.state.objects} />
                <VoiceConfig setVoiceProps={this.setVoiceProps}/>
                <ObjectAddition setExtraObject={this.setExtraObject}/>
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
