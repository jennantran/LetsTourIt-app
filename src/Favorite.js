import React from 'react';
import FavoritesContext from './FavoritesContext';

class Favorite extends React.Component {
    static contextType = FavoritesContext;
  
    render(){
        return (
            <div className='favorite' id={this.props.id}>
                <h2 id='name'>{this.props.name + ' '}</h2>
                <p id='rating'>{this.props.rating}</p> 
                <p id='address'>{this.props.address} </p>
                <button className='delete'
                    onClick={this.props.onClick}>Delete</button>
            </div>
        )
     };
}

export default Favorite;