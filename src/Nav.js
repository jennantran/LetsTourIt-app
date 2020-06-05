import React, { Component } from 'react';
import './Nav.css';

class Nav extends Component {
    render(){
        return(
            <section className='nav'>
                <h2>JustTourIt.</h2>
                <ul> 
                    <li><a href='/'>Home</a></li>
                    <li><a href='/login'>Log in </a></li>
                    <li><a href='/search'>Search </a></li>
                    <li><a href='/favorites'>Favorites</a></li>
                </ul>
            </section>
        );
    }
}

export default Nav; 