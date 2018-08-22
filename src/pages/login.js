import React, { Component } from 'react'
import LoginForm from '../components/login'
import AuthService from '../services/AuthService'

class Login extends Component {
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
      let ids = sessionStorage.setItem("ids", "placeholder")  //This is a session that is used for the grocery list
      this.Auth.login(this.state.email,this.state.password)
          .then(res =>{this.props.history.replace('/pantry')})
              .catch(err =>{ alert(err) })
  }


    render() {
        return(
            <LoginForm
            onSubmit = {this.handleFormSubmit.bind(this)}
            onChange = {this.handleChange.bind(this)}
            history = {this.props.history}
             />
        )
    }
}

export default Login
