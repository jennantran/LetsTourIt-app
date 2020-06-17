import React from 'react';
import HomePage from  '../HomePage/HomePage';
import { BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import App from  '../App';

it('renders HomePage component without crashing', () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <BrowserRouter>
      <App>
          <HomePage/>
      </App>
    </BrowserRouter>,
    div
  );
  //clean up code
  ReactDOM.unmountComponentAtNode(div);
});

it('renders the HomePage UI as expected', () => {
    const tree = renderer
      .create(
        <BrowserRouter>
          <App>
              <HomePage/>
          </App>
        </BrowserRouter>
      )
      .toJSON();
  
    expect(tree).toMatchSnapshot();
  });