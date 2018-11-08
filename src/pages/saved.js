import React, { Component } from "react";
import "../App.css";
import { getSaved, deleteRecipe, sendText } from "../api/index";
import { Button } from "react-bootstrap";
import Page from "../components/page.js";

import SavedRecipes from "../components/savedRecipes";
import GroceryList from "../components/groceryList";

class Saved extends Component {
  constructor(props) {
    super(props);
    this.state = {
      saved: [],
      ids: "placeholder",
      show: false,
      groceryList: []
    };
  }

  handleClose = () => {
    this.setState({ show: false });
  };

  handleShow = () => {
    this.setState({ show: true });
  };

  handleClear = () => {
    //TODO Implement Redux Here
    sessionStorage.setItem("ids", "placeholder");
    let ids = sessionStorage.getItem("ids");
    let groceryList = [];
    this.setState({ ids, groceryList });
  };

  handleAdd = event => {
    let id = event.target.id; //This is the numeric id for the button that was clicked, which corresponds to the recipe id
    let ids = this.state.ids; //create a copy of the ids in state
    let saved = this.state.saved;
    let groceryList;

    if (ids === "placeholder") {
      //If the session just has the placeholder
      ids = id;
      groceryList = saved.filter(savedRecipe => savedRecipe.id == ids); //Here ids should just have one number
    } else if (!ids.split(",").includes(id)) {
      //If there are already many ids
      ids = ids + "," + id;
      groceryList = saved.filter(savedRecipe =>
        ids.split(",").includes(String(savedRecipe.id))
      ); //Here ids should have more than
    }

    sessionStorage.setItem("ids", ids); //Save filtered ids to session storage.  This will be made available in state

    if (this.state.ids != ids) {
      this.setState({ ids, groceryList });
      //Hack needs to be fixed, 2 clicks should remove from grocery list
    }
  };

  handleRemove = event => {
    let toRemove = String(event.target.id); //This is the button id that corresponds to a certin recipe
    let groceryList;

    if (!this.state.ids.split("").includes(",")) {
      //When there is only one recipe left
      sessionStorage.setItem("ids", "placeholder");
      groceryList = [];
    } else {
      //When there is more than one recipe left

      let updatedIds = this.state.ids.split(",").filter(id => id !== toRemove); //This filter allows all ids in the ids array to pass unless it matches the id that is to be removed
      sessionStorage.setItem("ids", updatedIds); //The updated ids are saved in session storage and available in state

      groceryList = this.state.saved.filter(savedRecipe =>
        updatedIds.includes(String(savedRecipe.id))
      );
    }

    let ids = sessionStorage.getItem("ids");

    this.setState({ ids, groceryList });
  };

  handleDelete = event => {
    let id = event.target.id;
    let { saved } = this.state;

    deleteRecipe(id);

    saved = saved.filter(recipe => recipe.id !== parseInt(id));

    this.setState({ saved });
  };

  handleSubmit = () => {
    this.state.groceryList.forEach(recipe => {
      let toText = {
        text: {
          message: `-\n\n//${recipe.label}// \n\n${recipe.ingredients
            .split("//")
            .map(string => "- " + string + "\n\n")
            .join("")}`
        }
      };
      sendText(toText).then(resp => console.log(resp));
    });
  };

  componentWillMount() {
    getSaved().then(res => {
      let saved = res.recipes;
      this.setState({ saved });
    });
  }

  render() {
    return (
      <Page>
        {this.state.saved.length != 0 ? (
          <div>
            <Button
              className="list_style"
              bsSize="large"
              onClick={this.handleShow}
            >
              See Grocery List
            </Button>

            <SavedRecipes
              saved={this.state.saved}
              handleDelete={this.handleDelete}
              handleAdd={this.handleAdd}
            />

            <GroceryList
              groceryList={this.state.groceryList}
              show={this.state.show}
              handleShow={this.handleShow}
              handleClose={this.handleClose}
              handleRemove={this.handleRemove}
              handleClear={this.handleClear}
              handleSubmit={this.handleSubmit}
            />
          </div>
        ) : (
          <div>
            <h3 className="empty-saved-page">
              You Do Not Have Any Saved Recipes
            </h3>
          </div>
        )}
      </Page>
    );
  }
}

export default Saved;
