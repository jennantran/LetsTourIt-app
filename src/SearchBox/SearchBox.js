import React, { Component } from 'react';
import './SearchBox.css';
import Place from '../Place';
import FavoritesContext from '../FavoritesContext';
import TokenService from '../services/token-service'

class SearchBox extends Component {
  static contextType = FavoritesContext;
    constructor(props){
      super(props);
      this.state = {
        search: '',
        results: [],
        selectedValue: '5',
        openNowCheck: false,
        user_id: '',
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
    const fave = e.currentTarget.parentNode;
    const favedetails = e.currentTarget.parentNode.children;

    const faveObject = {
            'id': fave.id,
            'name': favedetails.name.textContent.trim(),
            'rating': favedetails.rating.textContent,
            'address': favedetails.address.textContent,
            'user_id': this.context.user_id,
    }

    fetch(`${process.env.REACT_APP_SERVER_URL}/favorites/${faveObject.id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `bearer ${TokenService.getAuthToken()}`,
      },
      body: JSON.stringify({faveObject}),
    })
    .then((res) => {
      if(!res.ok){
          return res.json().then(e => Promise.reject(e))
      }
      return res.json()
    })
    .then((data) => {
        this.context.addFavorite(data);
    })
    .catch(error => {
        console.error(error);
    });  

  }

  handleSubmit = (event) => {
    event.preventDefault();

    const openNowCheck = this.state.openNowCheck;
    const selectedValue = this.state.selectedValue;
    const lat = this.state.currentLocation.lat;
    const lng = this.state.currentLocation.lng;
    const radius = `&radius=${selectedValue}`;
    const location =`&location=${lat},${lng}`;
    const open = `&opennow`;
    const API = '&key=AIzaSyBoLFRF2RY7_h5pL0k4Yo96Q5XI9ivlAAw';

    const baseUrl = 'https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/textsearch/json?query=';
    const params = [];
    let url;

    if(this.state.search){
      params.push(`search=${this.state.search}`)
    }
    if(radius){
      params.push(`radius=${selectedValue}`)
    }
    if(location){
      params.push(`location=${lat},${lng}`)
    }
    if(!openNowCheck){
       url =baseUrl + radius + location +  API;
    }else{
        params.push(`${open}`)
    }

    const query = params.join('&');
      url = `${baseUrl}?${query}?${API}`;
    console.log(url)

    return fetch(url)
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
      const places = resultList.map((resultItem) => {
        return <ul>
                  <li key={resultItem.id}> 
                      <Place
                        id={resultItem.id}
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
                      <label className='filter'>
                      <input 
                          type='checkbox' 
                          value='openNow' 
                          id='filterByHours' 
                          name='filterByHours'
                          onClick={ (e) => this.checkboxToggle(e.target.value)} 
                          />
                        Open Now
                      </label>
                      <label className='radius'>Search by Radius:</label>
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