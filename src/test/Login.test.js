import React from 'react';
import Login from  '../Auth/Login';
import { BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import App from  '../App';

it('renders Login component without crashing', () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <BrowserRouter>
      <App>
          <Login/>
      </App>
    </BrowserRouter>,
    div
  );
  //clean up code
  ReactDOM.unmountComponentAtNode(div);
});

it('renders the Login UI as expected', () => {
    const tree = renderer
      .create(
        <BrowserRouter>
          <App>
              <Login/>
          </App>
        </BrowserRouter>
      )
      .toJSON();
  
    expect(tree).toMatchSnapshot();
  });