import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Nav.css';
import TokenService from './services/token-service';
import FavoritesContext from './FavoritesContext';

class Nav extends Component {
  static contextType = FavoritesContext;
    state = {
      authToken: undefined,
      favorites: this.context.favorites,
    }

    handleLogoutClick = () => {
        TokenService.clearAuthToken();
        console.log(this.state);
        this.setState({authToken: undefined, favorites: []})
        
    }
  
    renderLogoutLink() {
      return (
        <li className='loggedIn'>
          <Link
            onClick={this.handleLogoutClick}
            to='/login'>
            Logout
          </Link>
        </li>
      )
    }
  
    renderLoginLink() {
      return (
        <li className='notLogged-in'>
          <Link
            to='/login'>
            Log in
          </Link>
        </li>
      )
    }
    render(){
        return(
            <section className='nav'>
                <h2>JustTourIt.</h2>
                <ul> 
                    <li><Link to='/'>Home</Link></li>
                    <li><Link to='/search'>Search </Link></li>
                    <li><Link to='/favorites'>Favorites</Link></li>
                    {TokenService.hasAuthToken()
                        ? this.renderLogoutLink()
                        : this.renderLoginLink()}
                </ul>
            </section>
        );
    }
}

export default Nav; 