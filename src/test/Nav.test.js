import React from 'react';
import Nav from '../Nav';
import { BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import App from  '../App';

it('renders Nav component without crashing', () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <BrowserRouter>
      <App>
          <Nav/>
      </App>
    </BrowserRouter>,
    div
  );
  //clean up code
  ReactDOM.unmountComponentAtNode(div);
});

it('renders the Nav UI as expected', () => {
    const tree = renderer
      .create(
        <BrowserRouter>
        <App>
           <Nav/>
        </App>
      </BrowserRouter>,
      )
      .toJSON();
  
    expect(tree).toMatchSnapshot();
  });