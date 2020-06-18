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
import TokenService from './services/token-service'
import AuthApiService from './services/auth-api-service'

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
        })
        fetch(process.env.REACT_APP_SERVER_URL + `/favorites`, {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                "Authorization": `bearer ${TokenService.getAuthToken()}`,
                "user_id": res.user_id
              },
            })
              .then((response) => response.json())
              .then((responseJson) => {
                if (responseJson.success && responseJson.success === false) {
                  throw new Error("error in getting favorites");
                } else {
                  console.log(responseJson);
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
        this.setState({ error: res.error })
      });
  };
  addFavorite = favorite => {
    this.setState({
      favorites: [...this.state.favorites,favorite]
    })
    setTimeout(() => console.log(this.state)); 
  }

// getAllFavorites(){
//     fetch(process.env.REACT_APP_SERVER_URL + `/favorites`, {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//         "authorization": `basic ${TokenService.getAuthToken()}`,
//       },
//     })
//     .then((res) => res.json()
//     .catch(error( {error})
//   }

  // addFavorite = (place) => {
  //   console.log(TokenService.getAuthToken());
  //   console.log(place);
  //   return fetch(`${process.env.REACT_APP_SERVER_URL}/favorites/${place.id}`, {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       'Authorization': `bearer ${TokenService.getAuthToken()}`,
  //     },
  //     body: JSON.stringify({place}),
  //   })
  //     .then((res) =>{
  //       if(res.ok){
  //         console.log(this.state);
  //         this.setState({
  //           favorites: [...this.state.favorites, place]
  //         })
  //       }
  //     }
  //     )
  // }


  deleteFavorite = (place) => {
    return fetch(`${process.env.REACT_APP_SERVER_URL}/favorites/${place.id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `bearer ${TokenService.getAuthToken()}`,
      },
    })
      .then((res) =>  {
        console.log(place);
        this.setState({
            favorites: this.state.favorites.filter(p=> p.id !== place.id)
          })
          return(res);
       })
      .catch((error) => {
        console.error(error);
        this.setState({ error });
      });
  };

  addUser = (username) => {
    return fetch(`${process.env.REACT_APP_SERVER_URL}/signUp`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({username}),
    })
  }

  clearFavorites = () => {
    this.setState({
      favorites: [],
    })
  }

  render(){
    const contextValue = {
      favorites: this.state.favorites,
      addFavorite: this.addFavorite,
      deleteFavorite: this.deleteFavorite,
      handlePostAuthenticate: this.handlePostAuthenticate,
      clearFavorites: this.clearFavorites,
      user_id: this.state.user_id,
      addUser: this.addUser
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