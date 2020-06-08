import React, { Component } from 'react';
import './SearchBox.css';
import Place from '../Place';
import FavoritesContext from '../FavoritesContext';
// import dummyStore from '../dummyStore';


class SearchBox extends Component {
  static contextType = FavoritesContext;
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
    const fave = e.currentTarget.parentNode;
    const favedetails = e.currentTarget.parentNode.children;

    console.log(fave);
    console.log(favedetails);
    console.log(favedetails.name.textContent.trim());

    // console.log(fave.name.nodeValue);


    const faveObject = {
            'id': fave.id,
            'name': favedetails.name.textContent.trim(),
            'rating': favedetails.rating.textContent,
            'address': favedetails.address.textContent
    }
    console.log(faveObject);
    this.context.addFavorite(faveObject);
    
 
  }
  // handleSubmit = (event) => {
  //   event.preventDefault();
  //   setTimeout(() => this.setState(dummyStore), 600);
  // }
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
                          onClick={ (e) => this.favoriteToggle(e.target.value)} 
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