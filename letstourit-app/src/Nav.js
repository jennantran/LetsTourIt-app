import React, { Component } from 'react';
import './Nav.css';

class Nav extends Component {
    render(){
        return(
            <section className='nav'>
                <h2>JustTourIt.</h2>
                <ul>
                    <li><a href='/'>Home</a></li>
                    <li><a href='/logIn'>Log in </a></li>
                    <li><a href='/favoritedList'>Favorited List</a></li>
                </ul>
            </section>
        );
    }
}

export default Nav; 