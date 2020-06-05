import React from 'react';


class Favorite extends React.Component {
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
            </div>
        )
     };
}

export default Favorite;