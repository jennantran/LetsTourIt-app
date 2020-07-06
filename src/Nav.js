import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Nav.css';
import TokenService from './services/token-service';
import FavoritesContext from './FavoritesContext';

class Nav extends Component {
  static contextType = FavoritesContext;
  constructor(props){
    super(props);
    this.state = {
      authToken: undefined,
    }
  }
    handleLogoutClick = () => {
        TokenService.clearAuthToken();
        this.setState({authToken: undefined});
        this.context.clearFavorites();
        
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
               <Link to='/'><h2>JustTourIt.</h2></Link>
                <div>
                  <ul> 
                      <li><Link to='/'>Home</Link></li>
                      <li><Link to='/search'>Search </Link></li>
                      {TokenService.hasAuthToken()
                          ? <li><Link id='favorites' to='/favorites'>Favorites</Link></li>
                          : null}
                      
                      {TokenService.hasAuthToken()
                          ? this.renderLogoutLink()
                          : this.renderLoginLink()}
                  </ul>
                  </div>
            </section>
        );
    }
}

export default Nav; 