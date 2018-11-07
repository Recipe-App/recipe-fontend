import React, { Component } from "react";
import { Navbar, NavItem, Nav } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import AuthService from "../services/AuthService";

const Auth = new AuthService();
class Header extends Component {
  handleLogout() {
    Auth.logout();
  }

  render() {
    return (
      <div className="header">
        {Auth.loggedIn() ? (
          <div className="nav-links">
            <NavLink
              to="/pantry"
              activeStyle={{
                fontWeight: "bold",
                color: "#B2DB66"
              }}
            >
              Pantry
            </NavLink>
            <NavLink
              to="/recipes"
              activeStyle={{
                fontWeight: "bold",
                color: "#B2DB66",
              }}
            >
               Recipes
            </NavLink>
            <NavLink
              to="/saved"
              activeStyle={{
                fontWeight: "bold",
                color: "#B2DB66"
              }}
            >
              Saved
            </NavLink>
            <NavLink
              to="/profile"
              activeStyle={{
                fontWeight: "bold",
                color: "#B2DB66"
              }}
            >
              Profile
            </NavLink>
            <NavLink onClick={this.handleLogout} to="/">
              Logout
            </NavLink>
          </div>
        ) : (
          <NavItem>
            <Link to="/">Login</Link> | <Link to="/register">Register</Link>
          </NavItem>
        )}
      </div>
    );
  }
}
export default Header;
