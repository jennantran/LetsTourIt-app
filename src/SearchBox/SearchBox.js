import React, { Component } from 'react';
import './SearchBox.css';

class SearchBox extends Component {
    constructor(props){
      super(props);
      this.state = {
        search: '',
        results: []
      }
  }

  updateSearch(search){
    this.setState({
      search: search
    })
  }

  handleSubmit(event){
    console.log('handleSubmit');
    console.log(event);
    event.preventDefault();

    const search = this.state.search;
    const searchUrl=search.replace(/s/g,"%20");
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    const baseUrl = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${searchUrl}`;
    const API = '&key=AIzaSyBHdqGP9ct6h2F5z6QaCdnp_4IQXSxxjxA';
    console.log(search);
    console.log(baseUrl);

    fetch(proxyUrl + baseUrl + API)
      .then(response => response.json())
      .then(json => {
         console.log(json);
         this.setState({
           results: json.results
         })
    });
  }

    render() {
        const resultList = this.state.results;
        console.log(resultList);
        const places = resultList.map(function(resultItem){
          return <li>{resultItem.name}
          {resultItem.rating}</li>
        })
      return (
        <div>
           <form className='SearchBox'
                onSubmit = {e => this.handleSubmit(e)}>
              <input 
                  required
                  type='text'
                  name='search'
                  id='search' 
                  placeholder='Golden Gate Bridge'
                  onChange={e => this.updateSearch(e.target.value)}/>
              <input type='submit'  
                    className='submit'
                    />
              </form>   
            <section id='results'>
                <h2>Search results</h2>
                  <ul>
                    {places}
                  </ul>
            </section>`
          </div>
      );
    }
  }
  
  export default SearchBox;