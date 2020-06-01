import React, { Component } from 'react';
import './HomePage.css';

export default class HomePage extends Component {
    render(){
        return(
            <div className='homePage'>
                <section className='homePageSect'>
                    <div>
                        <img className='compass' src={require('./images/compass.jpg')} alt='bay-bridge'/>   
                    </div>
                    <div className='header'>
                        <h1>Let the Exploring Begin</h1>
                        <p><em>Don't know what to do? </em></p>
                        <p><em>Search for things to do and things to eat. </em></p>
                        <button>Sign Up</button>
                    </div>
                </section>
            </div>
        )
    }
}

