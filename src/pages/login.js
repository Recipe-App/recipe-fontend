import React, { Component } from 'react'
import LoginForm from '../components/login'
import Header from '../components/header'

class Login extends Component {
    render() {
        return(
            <div>
            <Header />
            <LoginForm history = {this.props.history}/>
            </div>
        )
    }
}

export default Login
