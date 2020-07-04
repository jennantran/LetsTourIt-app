import React, { Component } from 'react';
import Favorite from './Favorite';
import FavoritesContext from './FavoritesContext';
import './FavoritedList.css';

class FavoritedList extends Component{
    state =  {
        error:  null,
        favorites:[],
    }

static contextType = FavoritesContext;

handleDelete = (e) => {
    const deleteItem= e.currentTarget.parentNode.children;
    const deleteItemId = e.currentTarget.parentNode.id;


    const deleteObject = {
        'id': deleteItemId,
        'name': deleteItem.name.textContent.trim(),
        'rating': deleteItem.rating.textContent,
        'address': deleteItem.address.textContent,
        'user_id': this.context.user_id,
}   

this.context.deleteFavorite(deleteObject);
}
    render(){
        const { favorites } = this.context
      
        return (
            <section className = 'favList'>
                <h2>Favorites</h2>
                <ul>
                    <li 
                        key={favorites.id}>
                        {favorites.map(favorite =>
                            <Favorite 
                            id={favorite.id}
                            name={favorite.name}
                            rating ={favorite.rating}
                            address= {favorite.address}
                            onClick={ (e) => this.handleDelete(e)}
                            />
                        )}
                    </li>
                 </ul>
            </section>
        );
    }
}
FavoritedList.defaultProps = {
    favorites: []
};

export default FavoritedList;