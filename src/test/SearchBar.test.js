import React from 'react';
import SearchBar from  '../SearchBar/SearchBar';
import { BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import App from  '../App';
import SearchPage from '../SearchPage';

it('renders SearchBar component without crashing', () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <BrowserRouter>
      <App>
          <SearchPage>
              <SearchBar/>
          </SearchPage>
      </App>
    </BrowserRouter>,
    div
  );
  //clean up code
  ReactDOM.unmountComponentAtNode(div);
});

it('renders the SearchBar UI as expected', () => {
    const tree = renderer
      .create(
        <BrowserRouter>
          <App>
          <SearchPage>
              <SearchBar/>
          </SearchPage>
          </App>
        </BrowserRouter>
      )
      .toJSON();
  
    expect(tree).toMatchSnapshot();
  });