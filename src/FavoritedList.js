import React, { Component } from 'react';
import Favorite from './Favorite';
import FavoritesContext from './FavoritesContext';

class FavoritedList extends Component{
    state =  {
        error:  null,
        favorites:[]
    }
   static contextType = FavoritesContext;
    render(){
        const { favorites } = this.context
        console.log(favorites);
        return (
            <section className = 'favList'>
                <h2>Favorites</h2>
                <ul className='favoritesList'>
                    {favorites.map(favorite =>
                        <Favorite
                        id={favorite.id}
                        name={favorite.name}
                        rating ={favorite.rating}
                        address= {favorite.address}
                        onClick={ e => this.deleteToggle(e)}
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