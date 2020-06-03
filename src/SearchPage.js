import React, { Component } from 'react';
import SearchBar from './SearchBar/SearchBar';
import Maps from './Maps';


class SearchPage extends Component {
    render(){
        return(
            <div className='searchPage'>
              <SearchBar/>
              <Maps/>
            </div>
        );
    }
}

export default SearchPage; 