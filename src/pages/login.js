import React, { Component } from "react";
import LoginForm from "../components/login";
import Page from "../components/page.js";

class Login extends Component {
  render() {
    return (
      <Page>
        <LoginForm history={this.props.history} />
      </Page>
    );
  }
}

export default Login;
