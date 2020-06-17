import React from 'react';
import SearchBox from  '../SearchBox/SearchBox';
import { BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import App from  '../App';
import SearchPage from '../SearchPage';
import SearchBar from '../SearchBar/SearchBar';

it('renders SearchBox component without crashing', () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <BrowserRouter>
      <App>
          <SearchPage>
              <SearchBar>
                  <SearchBox/>
              </SearchBar>
          </SearchPage>
      </App>
    </BrowserRouter>,
    div
  );
  //clean up code
  ReactDOM.unmountComponentAtNode(div);
});

it('renders the SearchBox UI as expected', () => {
    const tree = renderer
      .create(
        <BrowserRouter>
            <App>
                <SearchPage>
                    <SearchBar>
                        <SearchBox/>
                    </SearchBar>
                </SearchPage>
            </App>
        </BrowserRouter>,
      )
      .toJSON();
  
    expect(tree).toMatchSnapshot();
  });