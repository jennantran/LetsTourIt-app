import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'; 
import './HomePage.css';

 class HomePage extends Component {
    handleClick(e) {
        this.props.history.push('/signUp');
    }
     
    render(){
        return(
            <div className='homePage'>
                <section className='homePageSect'>
                    <div>
                        <img className='compass' src={require('./images/compass.jpg')} alt='bay-bridge'/>   
                    </div>
                    <div className='header'>
                        <h1 className='appTitle'>Let the Exploring Begin</h1>
                        <h2>Search for things to do and things to eat.</h2>
                        <p className='homepageDetails'>
                        Sign up and create an account to generate a favorited list!
                        Search up places based on your location and click on the heart icon to add to your list.
                      </p>
                        <button onClick={e => this.handleClick(e)}>Sign Up</button>
                    </div>
                </section>
                {/* <section className='details'>
                        <div id='col1'>
                            <i class="fas fa-user-plus"></i>
                            <p>Sign up and create an account to generate a favorited list!</p>
                        </div>
                        <div id='col2'>
                            <i class="fas fa-search"></i>
                            <p>Search up places based on your location and click on the heart icon to add to your list.</p>
                        </div>
                        <div id='col3'>
                            <i class="fas fa-list-ul"></i>
                            <p>Refer back to the list whenever you log in to your account.</p>
                        </div>
                </section> */}
            </div>
        );
    }
}

export default withRouter(HomePage);