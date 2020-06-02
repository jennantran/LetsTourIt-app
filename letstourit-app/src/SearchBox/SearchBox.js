import React, { Component } from 'react';
import './SearchBox.css';

class SearchBox extends Component {
    render() {
      return (
        <div className='SearchBox'>
          <input placeholder='Golden Gate Bridge'/>
        </div>   
      );
    }
  }
  
  export default SearchBox;