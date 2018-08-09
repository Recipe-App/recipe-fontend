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

    handleChange(event){
       this.setState({ [event.target.name]: event.target.value })
    }

    handleFormSubmit(event){
        event.preventDefault()
        let ids = sessionStorage.setItem("ids", ["placeholder"])  //This is a session that is used for the grocery list
        this.Auth.login(this.state.email,this.state.password)
            .then(res =>{this.props.history.replace('/')})
                .catch(err =>{ alert(err) })
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
