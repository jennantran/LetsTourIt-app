import React, { Component } from 'react';
import './Login.css';

class Login extends Component{
    render(){
        return(
            <div className='loginForm'>
                <form>
                    <h1>Login</h1>
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

export default Login;