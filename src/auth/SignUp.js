import React, { Component } from 'react';
import './SignUp.css';

class SignUp extends Component{
    state = {
        email: '',
        password: ''
    }

    render(){
        return(
            <div className='signUpForm'>
                <form>
                    <h1>Sign Up: </h1>
                    <label>
                        Email:
                        <input 
                            type='text' 
                            name='email'
                            placeholder='email'
                            onChange={(e) => this.onChange(e)}
                            value={this.state.password}
                             />
                    </label>
                    <label>
                        Password
                        <input 
                            type='password'
                            name='password'
                            placeholder='password'
                            onChange={(e) => this.onChange(e)} 
                            value={this.state.password} />
                    </label>
                    <input type='submit' 
                            value='submit'
                            onClick = {() => this.onSubmit} />
                </form>
            </div>
        )
    }
}

export default SignUp;