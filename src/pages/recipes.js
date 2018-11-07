import React, { Component } from "react";
import NewRecipes from "../components/newRecipes";
import Page from "../components/page.js";

class Recipes extends Component {
  render() {
    return (
      <Page>
        <NewRecipes />
      </Page>
    );
  }
}

export default Recipes;
