import React from 'react';
//import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
import './Page.css';
import Navigation from "./components/navigation";
import VoiceConfig from "./components/voiceConfig";
import SttExample from "./components/sttExample";
import ConnectionExample from "./components/connectionExample";




export default class App extends React.Component{

  constructor(props){
    super(props);
    this.state = {
        voiceProps: [],
    };

    this.setVoice = this.setVoice.bind(this);
  }

  setVoice = (voiceProps) => {
      this.setState({ voiceProps: voiceProps});
  }

  render(){
    return (
        <div className="App">
            <header className="App-header">
                <h1>Sight ++</h1>
                <Navigation voiceProps={this.state.voiceProps}/>
                <VoiceConfig setVoice={this.setVoice}/>
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
