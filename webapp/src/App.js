import React from 'react';
import logo from './logo.svg';
import './Page.css';
import TextToSpeech from "./textToSpeech";
import Example from './Example';


export default class App extends React.Component{

  constructor(props){
    super(props);
  }

  render(){
    return (
      <Example />
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
