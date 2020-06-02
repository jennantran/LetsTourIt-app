import React, { Component } from 'react';
// import './SearchBar.css';
import SearchBox from '../SearchBox/SearchBox';
import FilterOptions from '../FilterOptions/FilterOptions';

class SearchBar extends Component {
    render(){
        return(
            <div className='search'>
                <div className='searchbar'>
                    <div className='searchbarHeadering'>
                        <h1>Search for Places</h1>
                    </div>
                </div>
                <div className='searchbarControls'>
                    <SearchBox/>
                    <FilterOptions/>
                </div>
            </div>
        );
    }
}
export default SearchBar;