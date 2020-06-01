import React, { Component } from 'react';
import SearchBar from './SearchBar/SearchBar';


class SearchPage extends Component {
    render(){
        return(
            <div className='searchPage'>
              <SearchBar/>
            </div>
        );
    }
}

export default SearchPage; 