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
import dummyStore from './dummyStore';
import SignUp from './auth/SignUp';
import TokenService from './services/token-service'
import AuthApiService from './services/auth-api-service'

class App extends Component {
   state = {
     favorites: [],
     addFavorite: this.addFavorite,
     deleteFavorite: this.deleteFavorite,
     error: null,
     user_id: '',
   }
  
//    componentDidMount() {
//     // fake date loading from API call
//     setTimeout(() => this.setState(dummyStore), 600);
// }



  handlePostAuthenticate = ({ username, password, user_id }) => {
    AuthApiService.postLogin({
      username: username.value,
      password: password.value,
    })
      .then(res => {
        // console.log(username.value)
        // console.log(password.value)
        // console.log(res.authToken);
        TokenService.saveAuthToken(res.authToken)

        // console.log(TokenService.getAuthToken())
        this.setState({
          user_id: res.user_id
        })
        // this.handleGetFavorites();
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

  // componentDidMount(){
  //   console.log(TokenService.getAuthToken())
  //   


  // addFavorite = favorite => {
  //   this.setState({
  //     favorites: [...this.state.favorites,favorite]
  //   })
  //   setTimeout(() => console.log(this.state));
    
  // }

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

  addFavorite(place) {
    console.log(TokenService.getAuthToken());
    console.log(place);
    return fetch(`${process.env.REACT_APP_SERVER_URL}/favorites/${place.id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `bearer ${TokenService.getAuthToken()}`,
      },
      body: JSON.stringify({place}),
    })
      .then(res =>
        this.setState({
          favorites: [...this.state.favorites, place]
        })
      )
  }

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

    // handleDeleteFavorite = (placeId) =>{
    //   console.log(placeId);
    //   console.log(this);
    //   this.setState({
    //     favorites: this.state.favorites.filter(place=> place.id !== placeId)
    //   })
    // }

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
      user_id: this.state.user_id
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