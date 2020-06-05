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

class App extends Component {
   state = {
     favorites: [],
     addFavorite: this.addFavorite,
   }
  

   setFavorites = favorites => {
     this.setState({
       favorites: [],
     })
   }


   addFavorite = favorite => {
     this.setState({
       favorites: [...this.state.favorites,favorite]
     })
     setTimeout(() => console.log(this.state));
     
   }
   componentDidMount() {
    // fake date loading from API call
    setTimeout(() => this.setState(dummyStore), 600);
}


  render(){
    const contextValue = {
      favorites: this.state.favorites,
      addFavorite: this.addFavorite
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