import React, { Component, Fragment } from "react";
import {
  getRecipes,
  saveRecipes,
  getPantryItems,
  deleteRecipe,
  getSaved
} from "../api/index";
import { Image, Button, Panel } from "react-bootstrap";
import AuthService from "../services/AuthService";
import Loading from "./loading.js";
import Card from "./card.js";

class NewRecipes extends Component {
  constructor(props) {
    super(props);
    this.Auth = new AuthService();
    this.state = {
      recipes: [],
      isLoading: true,
      saved: [],
      id: []
    };
  }

  processRecipe(recipe) {
    let toSave = {};
    toSave.user_id = this.Auth.getUserId();
    toSave.label = recipe.label;
    toSave.ingredients = recipe.ingredients
      .map(obj => {
        return obj.text;
      })
      .join("//");
    toSave.url = recipe.url;
    toSave.image = recipe.image;
    return toSave;
  }

  handleClick = e => {
    // It adds the clicked recipe into state and prevents duplicate entries
    let newSaved = [...this.state.saved];
    if (!newSaved.includes(e.target.getAttribute("url"))) {
      let toSave = {
        recipe: this.processRecipe(
          this.state.recipes[e.target.getAttribute("index")].recipe
        )
      };
      saveRecipes(toSave)
        .then(resp => resp)
        .catch(err => console.log(err));
      newSaved.push(e.target.getAttribute("url"));
      this.setState({ saved: newSaved });
    } else {
      let id;
      let updatedSaved = [];
      this.state.id.recipes.map(x => {
        if (e.target.getAttribute("url") === x.url) {
          id = x.id;
        } else {
          updatedSaved.push(x.url);
        }
      });
      deleteRecipe(id)
        .then(resp => console.log(resp))
        .catch(err => console.log(err));
      this.setState({ saved: updatedSaved });
    }
  };

  getApi = () => {
    let id = this.Auth.getUserId();
    let array = [];
    return getPantryItems(id)
      .then(resp => {
        array = [resp.proteins, resp.veggies];
        array = array.join();
        return array;
      })
      .then(resp => getRecipes(resp).then(resp => resp));
  };

  componentDidMount() {
    this.getApi().then(resp1 => {
      getSaved()
        .then(resp => resp)
        .then(resp => {
          let loading = resp1 === undefined ? true : false;
          let prevSaved = resp.recipes.map(x => x.url);
          let prevSavedId = resp.recipes.map(x => x.id);
          this.setState({
            recipes: resp1,
            isLoading: loading,
            saved: prevSaved,
            id: resp
          });
        });
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.saved !== prevState.saved) {
      getSaved().then(resp => {
        this.setState({ id: resp });
      });
    }
    if (this.state.recipes === undefined) {
      let check;
      let timedCall = () => {
        this.getApi().then(resp1 => {
          check = resp1 === undefined ? true : false;
          let loading = resp1 === undefined ? true : false;
          this.setState({ recipes: resp1, isLoading: loading });
        });
      };
      setTimeout(timedCall, 5000);
    }
  }

  render() {
    return this.state.isLoading ? (
      <Loading />
    ) : (
      <div className="flex-container">
        {this.state.recipes.map((element, index) => (
          <Card
            image={element.recipe.image}
            index={index}
            url={element.recipe.url}
            saved={this.state.saved}
            label={element.recipe.label}
            ingredients={element.recipe.ingredients}
            handleClick={this.handleClick}
          />
        ))}
      </div>
    );
  }
}

export default NewRecipes;
