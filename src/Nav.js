import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Nav.css';

class Nav extends Component {
    render(){
        return(
            <section className='nav'>
                <h2>JustTourIt.</h2>
                <ul> 
                    <li><Link to='/'>Home</Link></li>
                    <li><Link to='/login'>Log in </Link></li>
                    <li><Link to='/search'>Search </Link></li>
                    <li><Link to='/favorites'>Favorites</Link></li>
                </ul>
            </section>
        );
    }
}

export default Nav; 