// import React, {Component} from 'react';
// import './Page.css';
//
//
// export default class TextToSpeech extends Component {
//
//     constructor(props) {
//         super(props);
//         this.state = {
//             synth: window.speechSynthesis,
//             inputForm: document.querySelector('form'),
//             inputTxt: document.querySelector('.txt'),
//             voiceSelect: document.querySelector('select'),
//
//             pitch: document.querySelector('#pitch'),
//             pitchValue: document.querySelector('.pitch-value'),
//             rate: document.querySelector('#rate'),
//             rateValue: document.querySelector('.rate-value'),
//
//             voices: [],
//         }
//         //binding
//         this.populateVoiceList = this.populateVoiceList.bind(this);
//         this.speak = this.populateVoiceList.speak(this);
//         this.inputForm = this.inputForm(this);
//     }
//
//
//     //populate voice list
//     populateVoiceList() {
//         //retrieve a voice list
//         this.state.voices = synth.getVoices().sort(function (a, b) {
//             const aname = a.name.toUpperCase(), bname = b.name.toUpperCase();
//             if ( aname < bname ) return -1;
//             else if ( aname == bname ) return 0;
//             else return +1;
//         });
//         var selectedIndex = voiceSelect.selectedIndex < 0 ? 0 : voiceSelect.selectedIndex;
//         voiceSelect.innerHTML = '';
//         for(var i = 0; i < voices.length ; i++) {
//             var option = document.createElement('option');
//             option.textContent = voices[i].name + ' (' + voices[i].lang + ')';
//
//             if(voices[i].default) {
//                 option.textContent += ' -- DEFAULT';
//             }
//
//             option.setAttribute('data-lang', voices[i].lang);
//             option.setAttribute('data-name', voices[i].name);
//             voiceSelect.appendChild(option);
//         }
//         voiceSelect.selectedIndex = selectedIndex;
//     }
//
//     //speak
//     speak(){
//         var {synth} = this.state
//
//         if (synth.speaking) {
//             console.error('speechSynthesis.speaking');
//             return;
//         }
//         if (inputTxt.value !== '') {
//             var utterThis = new SpeechSynthesisUtterance(inputTxt.value);
//             utterThis.onend = function (event) {
//                 console.log('SpeechSynthesisUtterance.onend');
//             }
//             utterThis.onerror = function (event) {
//                 console.error('SpeechSynthesisUtterance.onerror');
//             }
//             var selectedOption = voiceSelect.selectedOptions[0].getAttribute('data-name');
//             for(i = 0; i < voices.length ; i++) {
//                 if(voices[i].name === selectedOption) {
//                     utterThis.voice = voices[i];
//                     break;
//                 }
//             }
//             utterThis.pitch = pitch.value;
//             utterThis.rate = rate.value;
//             synth.speak(utterThis);
//         }
//     }
//
//     inputForm.onsubmit = function(event) {
//         event.preventDefault();
//
//         speak();
//
//         inputTxt.blur();
//     }
//
//     pitch.onchange = function() {
//         pitchValue.textContent = pitch.value;
//     }
//
//     rate.onchange = function() {
//         rateValue.textContent = rate.value;
//     }
//
//     voiceSelect.onchange = function(){
//         speak();
//     }
//
//     //initialize: link to the backend
//     componentDidMount() {
//
//         this.populateVoiceList();
//         if (speechSynthesis.onvoiceschanged !== undefined) {
//             speechSynthesis.onvoiceschanged = this.populateVoiceList;
//         }
//
//
//
//
//     }
//
//     render() {
//         return (
//             <div className="App">
//                 <body>
//                 <h1>Sight++</h1>
//
//                 <form>
//                     <input type="text" className="txt" />
//                         <div>
//                             <label htmlFor="rate">Rate</label>
//                             <input type="range" min="0.5" max="2" value="1" step="0.1" id="rate" />
//                             <div className="rate-value">1</div>
//                             <div className="clearfix"></div>
//                         </div>
//                         <div>
//                             <label htmlFor="pitch">Pitch</label>
//                             <input type="range" min="0" max="2" value="1" step="0.1" id="pitch" />
//                             <div className="pitch-value">1</div>
//                             <div className="clearfix"></div>
//                         </div>
//                         <select>
//
//                         </select>
//                         <div className="controls">
//                             <button id="play" type="submit">Play</button>
//                         </div>
//                 </form>
//
//                 </body>
//             </div>
//         )
//     }
//
// }
//
//
