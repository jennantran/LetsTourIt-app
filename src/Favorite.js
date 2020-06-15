import React from 'react';
import FavoritesContext from './FavoritesContext';

class Favorite extends React.Component {
    static contextType = FavoritesContext;
  
    render(){
        return (
            <div className='favorite' id={this.props.id}>
                    <div className='favoriteName'>
                        {this.props.name}
                        {this.props.rating} 
                    </div>
                   
                <div className='favoriteAddress'>
                    {this.props.address}
                </div>
                <button className='delete'
                        onClick={this.props.onClick}>Delete</button>
            </div>
        )
     };
}

export default Favorite;