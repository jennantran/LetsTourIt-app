import React, { Component } from 'react';
import './SignUp.css';

class SignUp extends Component{
    state = {
        email: '',
        password: ''
    }

    onChangePw = (e) => {
        this.setState({
            password: e.target.value,
        })
        console.log(this.state.password);
    }

    onChangeEmail = (e) => {
        this.setState({
            email: e.target.value,
        })
        console.log(this.state.email)
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
                            onChangeEmail={(e) => this.onChangeE(e)}
                             />
                    </label>
                    <label>
                        Password
                        <input 
                            required
                            type='password'
                            name='password'
                            placeholder='password'
                            onChangePw={(e) => this.onChangePw(e)} 
                             />
                    </label>
                    <input 
                            required
                            type='submit' 
                            value='submit'
                            onClick = {() => this.onSubmit} />
                </form>
            </div>
        )
    }
}

export default SignUp;