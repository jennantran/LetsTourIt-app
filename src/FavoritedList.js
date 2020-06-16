import React, { Component } from 'react';
import Favorite from './Favorite';
import FavoritesContext from './FavoritesContext';

class FavoritedList extends Component{
    state =  {
        error:  null,
        favorites:[],
    }

static contextType = FavoritesContext;

// handleDelete = (e) => {
//     console.log('delete');
//     const deleteItem= e.currentTarget.parentNode;
//     const faveId = deleteItem.id;
//     this.context.deleteFavorite(faveId);
// }


handleDelete = (e) => {
    console.log('delete');
    const deleteItem= e.currentTarget.parentNode.children;
    const deleteItemId = e.currentTarget.parentNode.id;
    console.log(e.currentTarget.parentNode.id)
    console.log(deleteItem);

    const deleteObject = {
        'id': deleteItemId,
        'name': deleteItem.name.textContent.trim(),
        'rating': deleteItem.rating.textContent,
        'address': deleteItem.address.textContent,
        'user_id': this.context.user_id,
}   
console.log(deleteObject);
this.context.deleteFavorite(deleteObject);
}

    render(){
        const { favorites } = this.context
        console.log(favorites);
        return (
            <section className = 'favList'>
                <h2>Favorites</h2>
                <ul className='favoritesList'>
                    <li key={favorites.id}>
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