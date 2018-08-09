import React, { Component } from 'react'
import { ControlLabel, Button, FormControl, FormGroup } from 'react-bootstrap'
import { createUser } from '../api/index'


class RegisterForm extends Component {
    constructor(props){
        super(props)
        this.state = {
            form: {
                    user: {
                        first_name: "",
                        last_name: "",
                        email: "",
                        phone: "",
                        city: "",
                        state: "",
                        zip: "",
                        password: "",
                        password_confirmation: ""
                    }
            }
        }
    }

    handleChange(event){
        let { form } = this.state
        form.user[event.target.name] = event.target.value
        this.setState({form: form})
    }

    handleSubmit(event){
        event.preventDefault()
        let { form } = this.state

        form.user.password_confirmation = form.user.password

    createUser(form)
    .then(successUser => {
        console.log("SUCCESS! New user: ", successUser);
    })
    //TODO
    // this.state.Auth.login(this.state.user.email,this.state.user.password)
    // .then(res =>{
    //   this.props.history.replace('/')
    // })
    }

    render(){
        return(
            <form onSubmit={this.handleSubmit.bind(this)}>
                <FormGroup>
                        <ControlLabel>First Name</ControlLabel>
                        <FormControl
                            type='text'
                            name='first_name'
                            value={this.state.value}
                            placeholder="First Name"
                            onChange={this.handleChange.bind(this)}/>

                        <ControlLabel>Last Name</ControlLabel>
                        <FormControl
                            type='text'
                            name='last_name'
                            value={this.state.value}
                            placeholder="Last Name"
                            onChange={this.handleChange.bind(this)}/>

                        <ControlLabel>Email</ControlLabel>
                        <FormControl
                            type='text'
                            name='email'
                            value={this.state.value}
                            placeholder="Email"
                            onChange={this.handleChange.bind(this)}/>

                        <ControlLabel>Phone</ControlLabel>
                        <FormControl
                            type='text'
                            name='phone'
                            value={this.state.value}
                            placeholder="Phone"
                            onChange={this.handleChange.bind(this)}/>

                        <ControlLabel>City</ControlLabel>
                        <FormControl
                            type='text'
                            name='city'
                            value={this.state.value}
                            placeholder="City"
                            onChange={this.handleChange.bind(this)}/>

                        <ControlLabel>State</ControlLabel>
                        <FormControl
                            type='text'
                            name='state'
                            value={this.state.value}
                            placeholder="State"
                            onChange={this.handleChange.bind(this)}/>

                        <ControlLabel>Zip Code</ControlLabel>
                        <FormControl
                            type='text'
                            name='zip'
                            value={this.state.value}
                            placeholder="Zip Code"
                            onChange={this.handleChange.bind(this)}/>

                        <ControlLabel>Password</ControlLabel>
                        <FormControl
                            type='password'
                            name='password'
                            value={this.state.value}
                            placeholder="Password"
                            onChange={this.handleChange.bind(this)}/>

                        <Button bsStyle="primary" type='submit' value='submit'>Register</Button>

                </FormGroup>
            </form>
        )
    }

}

export default RegisterForm;
