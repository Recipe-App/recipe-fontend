import React, { Component } from 'react'
import RegisterForm from '../components/register'

class Register extends Component {
    render() {
        return(
            <RegisterForm props={this.props.history}/>
        )
    }
}

export default Register
