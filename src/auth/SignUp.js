import React, { Component } from 'react';
import './SignUp.css';
import ValidationError from './ValidationError';
import { withRouter } from 'react-router-dom'; 
import FavoritesContext from '../FavoritesContext';

class SignUp extends Component{
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

    handleRegistrationRedirect = () => {
        const { history } = this.props
        history.push('/login')
      }

    updateUser(username) {
        this.setState({username: {value: username, touched: true}});
        }
        
    updatePassword(password) {
    this.setState({password: {value: password, touched: true}});
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const { username, password } = this.state;
        const newUser = { username, password }
        console.log('User',username);
        console.log('Password',password);
        this.context.addUser(newUser);
        alert('Successful sign up');
        this.handleRegistrationRedirect();

    }
    validateUsername() {
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
        } else if (!password.match(/[0-9]/)) {
          return 'Password must contain at least one number';
        }
      }

    render(){
        const userError = this.validateUsername();
        const passwordError = this.validatePassword();
        return(
            <div className='signUpForm'>
                <form className='userForm' onSubmit={ e => this.handleSubmit(e)}>
                    <h1>Sign Up</h1>
                    <label>
                        User:
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

export default withRouter(SignUp);