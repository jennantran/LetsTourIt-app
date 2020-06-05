import React, { Component } from 'react'
import dummyStore from './dummyStore';

class Place extends Component{
    state = {
       favorites:[]

    };

    componentDidMount() {
        setTimeout(() => this.setState(dummyStore), 600);
    }
    render(){
        return (
            <div className='Place'>
                <h2> {this.props.name} </h2>
                <p>{this.props.rating}</p> 
                    <p>{this.props.address} </p>
                    <i class="fas fa-heart"
                        onClick={this.props.onClick}
                    ></i>
            </div>

        )
        }
    }
export default Place;