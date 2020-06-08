import React from 'react';
import FavoritesContext from './FavoritesContext';
import config from './config';

class Favorite extends React.Component {
    static contextType = FavoritesContext;

    handleClickDelete = e => {
        e.preventDefault()
        const favoriteId = this.props.id;

    fetch(`${config.API_ENDPOINT}/favorites/${favoriteId}`, {
        method: 'DELETE',
        headers: {
          'content-type': 'application/json'
        },
      })
        .then(res => {
          if (!res.ok)
            return res.json().then(e => Promise.reject(e))
          return res.json()
        })
        .then(() => {
          this.context.deleteFavorite(favoriteId)
          this.props.onClick(favoriteId)
        })
        .catch(error => {
          console.error({ error })
        })
    }
  
    render(){
        return (
            <div className='favorite'>
                <div className='favoriteRow'>
                    <div className='favoriteName'>
                        {this.props.name}
                        {this.props.rating} 
                    </div>
                </div>      
                <div className='favoriteAddress'>
                    {this.props.address}
                </div>
                <button className='delete'
                        onClick={this.props.handleClickDelete}>Delete</button>
            </div>
        )
     };
}

export default Favorite;