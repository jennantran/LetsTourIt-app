import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import HomePage from './HomePage/HomePage';
import Nav from './Nav';
import Footer from './Footer';
import SearchPage from './SearchPage';
import Login from './auth/Login';
import Register from './auth/Register';
import './App.css';
import FavoritedList from './FavoritedList';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount(){
     navigator.geolocation.getCurrentPosition(function(position) {
      console.log("Latitude is :", position.coords.latitude);
      console.log("Longitude is :", position.coords.longitude);
    });
  }
  
  render(){
    return (
      <div className='app'>
        <nav>
          <Nav/>
        </nav>
        <main>
          <Route exact path='/' component={HomePage} />
          <Route path='/search' component={SearchPage} />
          <Route path='/login' component={Login} />
          <Route path='/register' component={Register} />
          <Route path='/favoritedList' component={FavoritedList} />
          
        </main>
        <footer>
          <Footer/>
        </footer>
      </div>
    );
  }
}

export default App;