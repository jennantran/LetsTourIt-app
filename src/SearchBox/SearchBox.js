import React, { Component } from 'react';
import './SearchBox.css';

class SearchBox extends Component {
    state = {
      query: '',
      places:[]
    }

  handleSearchChange = (e) => {
    this.setState({
      query: e.target.value
    })
  }

  componentDidMount(){
    const query = this.state;
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    const baseUrl = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${query}`;
    const API = '&key=AIzaSyBHdqGP9ct6h2F5z6QaCdnp_4IQXSxxjxA';
    fetch(proxyUrl + baseUrl + API)
      .then(response => response.json())
      .then(result => {
        this.setState({
          query: result.query
        });
    });
  }
    render() {
      return (
        <div className='SearchBox'>
          <input placeholder='Golden Gate Bridge'/>
          <input type='button'  
                 value='search'
                 onChange={this.handleSearchChange}
                 />
          <section id='results'>
              <h2>Search results</h2>
          </section>
        </div>   
      );
    }
  }
  
  export default SearchBox;