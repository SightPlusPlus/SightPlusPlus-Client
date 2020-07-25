import React from 'react';
import './Page.css';
import Navigation from "./components/navigation";
import VoiceConfig from "./components/voiceConfig";
import Button from "react-bootstrap/Button";



export default class App extends React.Component{

  constructor(props){
    super(props);
  }

  render(){
    return (
        <div className="App">
            <header className="App-header">
                <div className="man-user-jumbotron">
                    <div className="reset-form-title">Sight ++</div>
                    <br/>
                    <Navigation/>
                    <div className="resetPsw-form">
                         Test
                    </div>
                    <br/>
                </div>
            </header>
        </div>

    );
  }

}





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
