import React from 'react';
import { render } from '@testing-library/react';
import ReactDOM from 'react-dom';
import App from './App';
//import shallow from "enzyme/src/shallow";



test('renders without crashing', async () => {
  const div = document.createElement('div');
  await ReactDOM.render(<App />, div);
});


// it('renders without crashing', () => {
//   const div = document.createElement('div');
//   ReactDOM.render(<App />, div);
// });



// test('renders learn react link', () => {
//   const { getByText } = render(<App />);
//   const linkElement = getByText(/Sight ++/i);
//   expect(linkElement).toBeInTheDocument();
// });
