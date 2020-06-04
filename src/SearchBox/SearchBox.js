import React, { Component } from 'react';
import './SearchBox.css';

class SearchBox extends Component {
    constructor(props){
      super(props);
      this.state = {
        search: '',
        results: [],
        selectedValue: '5',
        openNowCheck: false,
        currentLocation: {
          lat: '',
          lng: ''
        },
        // latitude: coords.latitude,
        // longitude: coords.longitude,
      }
  }

  updateLocation() {
    console.log(navigator);
    if (navigator && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(pos => {
          const coords = pos.coords;
          this.setState({
            currentLocation: {
                lat: coords.latitude,
                lng: coords.longitude
            }
          });
          console.log(coords);
          console.log(this.state);

      });
      }
  }

  updateSearch(search){
    this.setState({
      search: search
    })
  }

  updateRadius(selectedValue){
    this.setState({
      selectedValue: selectedValue
    })
  }

  checkboxToggle() {
    console.log(this.state.openNowCheck)
      this.setState({
        openNowCheck: !this.state.openNowCheck
      })
      console.log(this.state.openNowCheck)
  }

  

  handleSubmit(event){
    event.preventDefault();
    this.updateLocation();
    const search = this.state.search;
    const selectedValue = this.state.selectedValue;
    const searchUrl= search.replace(/s/g,"%20");
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    const baseUrl = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${searchUrl}`;
    const radius = `&radius=${selectedValue}`;
    const open = `&opennow`;
    const API = '&key=AIzaSyBHdqGP9ct6h2F5z6QaCdnp_4IQXSxxjxA';

    const url = proxyUrl + baseUrl + radius + open + API;

    fetch(url)
      .then(response => response.json())
      .then(json => {
         console.log(json);
         this.setState({
           results: json.results
         })
      })
      .catch(function(err){
        console.log('There was an error');
      })
    }

    render() {
        const resultList = this.state.results;
        console.log(resultList);
        const places = resultList.map(function(resultItem){
          return <ul>
                    <li> 
                      {resultItem.name +' '}
                      {resultItem.rating}
                      {resultItem.formatted_address}
                    </li>
                  </ul>
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
                  placeholder='Search for places...'
                  onChange={e => this.updateSearch(e.target.value)}/>
              <input type='submit'  
                    className='submit'
                    />
                <div className='filterOptions'>
                      <label class='filter'>
                      <input 
                          type='checkbox' 
                          value='openNow' 
                          id='filterByHours' 
                          name='filterByHours'
                          onClick={ () => this.checkboxToggle()} 
                          />
                        Open Now
                      </label>
                      <label for='radius'>Search by Radius:</label>
                      <select 
                          value = {this.state.selectedValue}
                          onChange={e=> this.updateRadius(e.target.value)}
                          name='radius' id='radius'>
                        <option value='1'>1 miles</option>
                        <option value='5'>5 miles</option>
                        <option value='10'>10 miles</option>
                        <option value='20'>20 miles</option>
                    </select>
                 </div>
              </form>   
            <section id='results'>
                <h2>Search results</h2>
                  <ul>
                    {places}
                  </ul>
            </section>
          </div>
      );
    }
  }
  
  export default SearchBox;