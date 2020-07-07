import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import HomePage from './HomePage/HomePage';
import Nav from './Nav';
import Footer from './Footer';
import SearchPage from './SearchPage';
import Login from './auth/Login';
import './App.css';
import FavoritedList from './FavoritedList';
import FavoritesContext from './FavoritesContext';
import SignUp from './auth/SignUp';
import TokenService from './services/token-service';
import AuthApiService from './services/auth-api-service';
import API_ENDPOINT from './config'

class App extends Component {
   state = {
     favorites: [],
     addFavorite: this.addFavorite,
     deleteFavorite: this.deleteFavorite,
     addUser: this.addUser,
     error: null,
     user_id: '',
   }
  
  handlePostAuthenticate = ({ username, password, user_id }) => {
    AuthApiService.postLogin({
      username: username.value,
      password: password.value,
    })
      .then(res => {
        TokenService.saveAuthToken(res.authToken)
        this.setState({
          user_id: res.user_id
        });
        fetch(`${API_ENDPOINT.API_ENDPOINT}/favorites`, {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                "Authorization": `bearer ${TokenService.getAuthToken()}`,
                "user_id": res.user_id,
              },
            })
              .then((response) => response.json())
              .then((responseJson) => {
                if (responseJson.success && responseJson.success === false) {
                  throw new Error("error in getting favorites");
                } else {
                  this.setState({
                    favorites: responseJson,
                  });
                }
              })
              .catch((error) => {
                console.error(error);
              });
      })
      .catch(res => {
        this.setState({ error: res.error });
      });
  };
  addFavorite = favorite => {
    this.setState({
      favorites: [...this.state.favorites,favorite]
    });
 
  }

  deleteFavorite = (place) => {
    return fetch(`${API_ENDPOINT.API_ENDPOINT}/favorites/${place.id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `bearer ${TokenService.getAuthToken()}`,
      },
    })
      .then((res) =>  {
        this.setState({
            favorites: this.state.favorites.filter(p=> p.id !== place.id)
          });
          return(res);
       })
      .catch((error) => {
        this.setState({ error });
      });
  };

  addUser = (user) => {
    return fetch(`${API_ENDPOINT.API_ENDPOINT}/signUp`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    })
    .then( res => 
      (!res.ok)
        ? res.json().then(e => Promise.reject(e))
        : res.json(),
      )
  }

  clearFavorites = () => {
    this.setState({
      favorites: [],
    });
  }

  render(){
    const contextValue = {
      favorites: this.state.favorites,
      addFavorite: this.addFavorite,
      deleteFavorite: this.deleteFavorite,
      handlePostAuthenticate: this.handlePostAuthenticate,
      clearFavorites: this.clearFavorites,
      user_id: this.state.user_id,
      addUser: this.addUser,
    }
    return (
      <div className='app'>
      <FavoritesContext.Provider value={contextValue}>
        <nav>
          <Nav/>
        </nav>
        <main>
          <Route exact path='/' component={HomePage} />
          <Route path='/search' component={SearchPage} />
          <Route path='/login' component={Login} />
          <Route path='/signUp' component={SignUp} />
          <Route path='/favorites' component={FavoritedList} />
    
        </main>
        </FavoritesContext.Provider>
        <footer>
          <Footer/>
        </footer>
      </div>
    );
  }
}

export default App;