import React, { Component } from 'react';
import './SearchBox.css';
import Place from '../Place';

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
      }
  }

  updateLocation = () => {
    if (navigator && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(pos => {
          const coords = pos.coords;
          this.setState({
            currentLocation: {
                lat: coords.latitude,
                lng: coords.longitude
            }
          });
      });
      }
  }

  updateSearch = (search) => {
    this.setState({
      search: search
    })
  }

  updateRadius = (selectedValue) => {
    this.setState({
      selectedValue: selectedValue
    })
  }

  checkboxToggle = () =>  {
      this.setState({
        openNowCheck: !this.state.openNowCheck
      })
  }

  favoriteToggle = (e) => {
    console.log('favorite');
    console.log(e.currentTarget.parentNode);
    return e;
    //the passed in event targets the <li> get the value of the heart toggle
    //then based off that value 
    //1. Call function to Add favorite to favorites -> requires API
          // to write this function you need to get the values from 'e' and 
          // pass them to your API call fetch 
    // or 
    //2. Call function to delete favorite from favorites -> requires API
          // to write this function you need to make an API to get the
          // value of the placeID from 'e' pass it to the API
          // API will run the query to delete it from the user's database table


    //After this create the favoriteslist.js 
    //that file will call fetch for the user's favorites and you need
    //to fetch it at app start and save it to your ('this.state.favorites') 
    // state (maybe need context) also add the favoriteToggle to that file as well
  }
  
  handleSubmit = (event) => {
    event.preventDefault();
    const search = this.state.search;
    const openNowCheck = this.state.openNowCheck;
    const selectedValue = this.state.selectedValue;
    const lat = this.state.currentLocation.lat;
    const lng = this.state.currentLocation.lng;
    const searchUrl= search.replace(/s/g,"%20");
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    const baseUrl = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${searchUrl}`;
    const radius = `&radius=${selectedValue}`;
    const location =`&location=${lat},${lng}`;
    const open = `&opennow`;
    const API = '&key=AIzaSyBoLFRF2RY7_h5pL0k4Yo96Q5XI9ivlAAw';
    
    let url = proxyUrl + baseUrl + radius + location + open + API;
    
    if(!openNowCheck){
       url =proxyUrl + baseUrl + radius + location +  API;
    }else{
        console.log('looks good');
    }

    fetch(url)
      .then(response => response.json())
      .then(json => {
         this.setState({
           results: json.results
         })
      })
      .catch(function(err){
        console.log('There was an error');
      })
    }

    render() {
      this.updateLocation();
      const resultList = this.state.results;
      console.log(resultList);
      //Separate into seperate component ResultList/resultItem
      const places = resultList.map((resultItem, place_id) => {
        return <ul>
                  <li key={resultItem.place_id}> 
                      <Place
                        id={resultItem.place_id}
                        name={resultItem.name}
                        address={resultItem.formatted_address}
                        rating={resultItem.rating}
                        onClick={ e => this.favoriteToggle(e)}
                      />
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
                          onClick={ (e) => this.favoriteToggle(e.target.value)} 
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