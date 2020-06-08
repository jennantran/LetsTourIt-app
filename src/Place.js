import React, { Component } from 'react'

class Place extends Component{
    render(){               
        return (
            <div className='Place' id={this.props.id}>
                <h2 id='name'> {this.props.name + ' '} </h2>
                <p id='rating'>Rating: {this.props.rating}</p> 
                    <p id='address'>{this.props.address} </p>
                    <i className="fas fa-heart"
                        onClick={this.props.onClick}
                    ></i>
            </div>

        )
        }
    }
export default Place;