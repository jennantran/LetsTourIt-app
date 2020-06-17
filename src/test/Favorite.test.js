import React from 'react';
import FavoritedList from  '../FavoritedList';
import { BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import App from  '../App';
import Favorite from '../Favorite';

it('renders Favorite component without crashing', () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <BrowserRouter>
      <App>
          <FavoritedList>
              <Favorite/>
          </FavoritedList>
      </App>
    </BrowserRouter>,
    div
  );
  //clean up code
  ReactDOM.unmountComponentAtNode(div);
});

it('renders the Favorite UI as expected', () => {
    const tree = renderer
      .create(
        <BrowserRouter>
        <App>
            <FavoritedList>
                <Favorite/>
            </FavoritedList>
        </App>
      </BrowserRouter>,
      )
      .toJSON();
  
    expect(tree).toMatchSnapshot();
  });