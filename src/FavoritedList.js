import React, { Component } from 'react';
import Favorite from './Favorite';
import FavoritesContext from './FavoritesContext';

class FavoritedList extends Component{
    state =  {
        error:  null
    }
   static contextType = FavoritesContext;
    render(){
        const { favorites } = this.context
        return (
            <section className = 'favList'>
                <h2>Favorites</h2>
                <ul className='favoritesList'>
            {favorites.map(favorite =>
                <Favorite
                key={favorite.id}
                name={favorite.name}
                rating ={favorite.rating}
                address= {favorite.address}
                />
            )}
            </ul>
        </section>
        );
    }
}

FavoritedList.defaultProps = {
    favorites: []
};

export default FavoritedList;