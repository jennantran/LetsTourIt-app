import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'; 
import './HomePage.css';

 class HomePage extends Component {
    handleClick(e) {
        this.props.history.push('/signUp')
    }
     
    render(){
        return(
            <div className='homePage'>
                <section className='homePageSect'>
                    <div>
                        <img className='compass' src={require('./images/compass.jpg')} alt='bay-bridge'/>   
                    </div>
                    <div className='header'>
                        <h1>Let the Exploring Begin</h1>
                        <p>Search for things to do and things to eat.</p>
                        <p>Create an account to generate a favorited list!</p>
                        <button onClick={e => this.handleClick(e)}>Sign Up</button>
                    </div>
                </section>
            </div>
        );
    }
}

export default withRouter(HomePage);