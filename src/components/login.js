import React, { Component } from 'react'
import AuthService from '../services/AuthService'
import { ControlLabel, Button, FormControl, FormGroup } from 'react-bootstrap'

class LoginForm extends Component {
    constructor(props){
        super(props)
        this.Auth = new AuthService()
        this.state = {
            form: {
                email: "",
                password: ""
            }
        }
    }

    handleChange(e){
       this.setState({ [e.target.name]: e.target.value })
    }

    handleFormSubmit(e){
        e.preventDefault()
        this.Auth.login(this.state.email,this.state.password)
            .then(successUser => {
                console.log("SUCCESS! You Logged In ", successUser);
            })
                // .then(res =>{this.props.history.replace('/')})
                //     .catch(err =>{ alert(err) })
    }

    render() {
       return (
            <form onSubmit={this.handleFormSubmit.bind(this)}>
            <h1>Welcome to the Login Page!</h1>
                <FormGroup>
                        <ControlLabel>Email</ControlLabel>
                        <FormControl
                            type='text'
                            name='email'
                            value={this.state.value}
                            placeholder="Email"
                            onChange={this.handleChange.bind(this)}/><br/>

                        <ControlLabel>Password</ControlLabel>
                        <FormControl
                            type='password'
                            name='password'
                            value={this.state.value}
                            placeholder="Password"
                            onChange={this.handleChange.bind(this)}/><br/>

                        <Button bsStyle="danger" type='submit' value='submit'>Login</Button>
                    </FormGroup>
                </form>

        )
    }
}

export default LoginForm
