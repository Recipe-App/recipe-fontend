import React, { Component } from 'react'
import RegisterForm from '../components/register'
import Header from '../components/header'

class Register extends Component {
    render() {
        return(
            <div>
            <Header />
            <RegisterForm />
            </div>
        )
    }
}

export default Register
