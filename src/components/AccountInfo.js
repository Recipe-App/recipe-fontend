import React, { Component } from 'react';
import { getProfile } from '../api/index'

class AccountInfo extends Component {
  constructor(props){
    super(props);
    this.state = {
      user: ""
    }
  }

  componentWillMount(){
    getProfile()
      .then( res => {this.setState({ user: res })
    })
  }

  render() {
    console.log("Profile",this.state.user);
    return (
      <div>
      <h1> {this.state.user.first_name} </h1>
      <h1> {this.state.user.last_name} </h1>
      <h1> {this.state.user.email} </h1>
      <h1> {this.state.user.phone} </h1>
      <h1> {this.state.user.city} </h1>
      <h1> {this.state.user.state} </h1>
      <h1> {this.state.user.zip} </h1>
      <h1> {this.state.user.password} </h1>



      </div>
    );
  }
}

export default AccountInfo;
