import React from 'react';
import SignUp from  '../Auth/SignUp';
import { BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import App from  '../App';

it('renders SignUp component without crashing', () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <BrowserRouter>
      <App>
          <SignUp/>
      </App>
    </BrowserRouter>,
    div
  );
  //clean up code
  ReactDOM.unmountComponentAtNode(div);
});

it('renders the SignUp UI as expected', () => {
    const tree = renderer
      .create(
        <BrowserRouter>
          <App>
              <SignUp/>
          </App>
        </BrowserRouter>
      )
      .toJSON();
  
    expect(tree).toMatchSnapshot();
  });