import React, { Component } from 'react';
import './Login.css';
import ValidationError from './ValidationError';
import TokenService from '../services/token-service';

class Login extends Component{
    constructor(props) {
        super(props);
        this.state = {
            user: {
            value: '',
            touched: false
            },
            password: {
            value: '',
            touched: false
            },
        }
     }

    updateUser(user) {
        this.setState({user: {value: user, touched: true}});
        }
        
    updatePassword(password) {
    this.setState({password: {value: password, touched: true}});
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const { user, password } = this.state;
        TokenService.saveAuthToken(
            TokenService.makeBasicAuthToken(user.value, password.value)
          )
        console.log('User',user);
        console.log('Password',password);
    }
    validateUser() {
        const user = this.state.user.value.trim();
        if (user.length === 0) {
          return "user is required";
        } else if (user.length < 3) {
          return "User must be at least 3 characters long";
        }
      }
    
    validatePassword() {
        const password = this.state.password.value.trim();
        if (password.length === 0) {
          return 'Password is required';
        } else if (password.length < 6 || password.length > 72) {
          return 'Password must be between 6 and 72 characters long';
        } else if (!password.match(/[0-9]/)) {
          return 'Password must contain at least one number';
        }
      }

    render(){
        const userError = this.validateUser();
        const passwordError = this.validatePassword();
        return(
            <div className='loginForm'>
                <form className='userForm' onSubmit={ e => this.handleSubmit(e)}>
                    <h1>Login</h1>
                    <label>
                        User:
                        <input 
                            type='text' 
                            className='formInput'
                            name='user'
                            id='user'
                            onChange={e => this.updateUser(e.target.value)}/>
                             {this.state.user.touched && <ValidationError message={userError} />}
                    </label>
                    <label>
                        Password:
                        <input 
                            type='text' 
                            name='password'
                            className='formInput'
                            id='password'
                            onChange={e => this.updatePassword(e.target.value)}/>
                                 {this.state.password.touched && 
                                 <ValidationError message={passwordError} /> }
                    </label>
                    <input 
                        type='submit' 
                        value='submit' />
                </form>
            </div>
        )
    }
}

export default Login;