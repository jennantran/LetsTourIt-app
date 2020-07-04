import React, { Component } from 'react';
import './Place.css';

class Place extends Component{
    render(){               
        return (
            <div className='Place' id={this.props.id}>
                <h2 id='name'> {this.props.name + ' '} </h2>
                <div id='ratingContainer'>
                    <p>Rating:&nbsp; </p>
                     <p id='rating'>{this.props.rating}</p> 
                </div>
                    <p id='address'>{this.props.address} </p>
                    <i className="fas fa-heart"
                        onClick={this.props.onClick}
                    ></i>
            </div>

        )
        }
    }
export default Place;