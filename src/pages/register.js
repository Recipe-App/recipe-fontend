import React, { Component } from "react";
import RegisterForm from "../components/register";
import Page from "../components/page.js";

class Register extends Component {
  render() {
    return(
    <Page>
      <RegisterForm history={this.props.history} />
    </Page>)
  }
}

export default Register;
