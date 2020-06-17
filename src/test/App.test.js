import React from 'react';
import App from  '../App';
import { BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';

it('renders App component without crashing', () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <BrowserRouter>
      <App>
      </App>
    </BrowserRouter>,
    div
  );
  //clean up code
  ReactDOM.unmountComponentAtNode(div);
});

it('renders the App UI as expected', () => {
    const tree = renderer
      .create(
        <BrowserRouter>
          <App>
          </App>
        </BrowserRouter>
      )
      .toJSON();
  
    expect(tree).toMatchSnapshot();
  });