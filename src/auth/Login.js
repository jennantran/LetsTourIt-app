import React, { Component } from 'react';
import './Login.css';
import ValidationError from './ValidationError';
import FavoritesContext from '../FavoritesContext';


class Login extends Component{
    static contextType = FavoritesContext;

    constructor(props) {
        super(props);
        this.state = {
            username: {
            value: '',
            touched: false
            },
            password: {
            value: '',
            touched: false
            },
        }
     }

    updateUser(username) {
        this.setState({username: {value: username, touched: true}});
        }
        
    updatePassword(password) {
    this.setState({password: {value: password, touched: true}});
    }
    
    handleSubmit = (e) => {
        e.preventDefault();
        this.context.handlePostAuthenticate(this.state);
        this.props.history.push('/favorites');
      }

    validateUser() {
        const username = this.state.username.value.trim();
        if (username.length === 0) {
          return "username is required";
        } else if (username.length < 3) {
          return "Username must be at least 3 characters long";
        }
      }
    
    validatePassword() {
        const password = this.state.password.value.trim();
        if (password.length === 0) {
          return 'Password is required';
        } else if (password.length < 6 || password.length > 72) {
          return 'Password must be between 6 and 72 characters long';
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
                        Username:
                        <input 
                            type='text' 
                            className='formInput'
                            name='user'
                            id='user'
                            onChange={e => this.updateUser(e.target.value)}/>
                             {this.state.username.touched && <ValidationError message={userError} />}
                    </label>
                    <label>
                        Password:
                        <input 
                            type='password' 
                            name='password'
                            className='formInput'
                            id='password'
                            onChange={e => this.updatePassword(e.target.value)}/>
                                 {this.state.password.touched && 
                                 <ValidationError message={passwordError} /> }
                    </label>
                    <input 
                        id='submit'
                        type='submit' 
                        value='submit' />
                </form>
            </div>
        )
    }
}

export default Login;