import React, { Component } from "react";
import AccountInfo from "../components/AccountInfo";
import Page from "../components/page.js";

class Profile extends Component {
  render() {
    return (
      <Page>
        <AccountInfo />
      </Page>
    );
  }
}

export default Profile;
