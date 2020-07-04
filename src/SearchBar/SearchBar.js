import React, { Component } from 'react';
import SearchBox from '../SearchBox/SearchBox';

class SearchBar extends Component {
    render(){
        return(
                <div className='searchbarControls'>
                    <SearchBox/>   
                </div>   
        );
    }
}
export default SearchBar;