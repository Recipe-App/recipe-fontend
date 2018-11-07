import React, { Component } from "react";
import LandingForm from "../components/landingForm";
import Page from "../components/page.js";
class Landing extends Component {
  render() {
    return (
      <Page>
        <div className="cover">
        <LandingForm history={this.props.history} />
        </div>
      </Page>
    );
  }
}

export default Landing;
