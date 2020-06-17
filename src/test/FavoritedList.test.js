import React from 'react';
import FavoritedList from  '../FavoritedList';
import { BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import App from  '../App';

it('renders FavoritedList component without crashing', () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <BrowserRouter>
      <App>
          <FavoritedList/>
      </App>
    </BrowserRouter>,
    div
  );
  //clean up code
  ReactDOM.unmountComponentAtNode(div);
});

it('renders the FavoritedList UI as expected', () => {
    const tree = renderer
      .create(
        <BrowserRouter>
          <App>
              <FavoritedList/>
          </App>
        </BrowserRouter>
      )
      .toJSON();
  
    expect(tree).toMatchSnapshot();
  });