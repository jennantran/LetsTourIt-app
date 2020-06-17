import React from 'react';
import Footer from '../Footer';
import { BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import App from  '../App';

it('renders Footer component without crashing', () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <BrowserRouter>
      <App>
          <Footer/>
      </App>
    </BrowserRouter>,
    div
  );
  //clean up code
  ReactDOM.unmountComponentAtNode(div);
});

it('renders the Footer UI as expected', () => {
    const tree = renderer
      .create(
        <BrowserRouter>
        <App>
            <Footer/>
        </App>
      </BrowserRouter>,
      )
      .toJSON();
  
    expect(tree).toMatchSnapshot();
  });