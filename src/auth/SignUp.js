import React, { Component } from 'react';
import './SignUp.css';

class SignUp extends Component{
    state = {
        email: '',
        password: ''
    }

    render(){
        return(
            <div className='registerForm'>
                <form>
                    <h1>Sign Up: </h1>
                    <label>
                        Email:
                        <input type='text' name='email' />
                    </label>
                    <label>
                        Password
                        <input type='text' name='password' />
                    </label>
                    <input type='submit' value='submit' />
                </form>
            </div>
        )
    }
}

export default SignUp;