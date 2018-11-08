import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from "./components/header";
import Register from "./pages/register.js";
import Login from "./pages/login";
import Landing from "./pages/landing";
import Recipes from "./pages/recipes";
import Saved from "./pages/saved";
import Profile from "./pages/profile";
import "./App.css";


require("dotenv").config();

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" component={Login} />
          <Route path="/pantry" component={Landing} />
          <Route path="/register" component={Register} />
          <Route path="/profile" component={Profile} />
          <Route path="/recipes" component={Recipes} />
          <Route path="/saved" component={Saved} />
        </div>
      </Router>
    );
  }
}

export default App;
