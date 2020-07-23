import React from 'react';
import './Page.css';
//import VoiceConfig from "./components/voiceConfig";
import Navigation from "./components/navigation";


export default class App extends React.Component{

  constructor(props){
    super(props);
  }

  render(){
    return (
        <div>
          <Navigation />
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
