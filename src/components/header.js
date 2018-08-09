import React, { Component } from 'react';
import { Navbar, NavItem, Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import AuthService from '../services/AuthService'
import '../App.css'

const Auth = new AuthService()

class Header extends Component {

    handleLogout(){
          Auth.logout()
    }


    render() {
        return (
            <Navbar className="header">
                <Navbar.Header>
                    <Navbar.Brand>
                        <Link to='/'>Recipe App</Link>
                    </Navbar.Brand>
                </Navbar.Header>

                <Nav>
                    {Auth.loggedIn()


                        ? <Nav>
                              <NavItem href="/">
                              Pantry
                              </NavItem>
                              <NavItem href="/recipes">
                              New Recipes
                              </NavItem>
                              <NavItem href="/saved">
                                Saved
                              </NavItem>
                              <NavItem href="/profile">
                              Profile
                              </NavItem>
                              <NavItem onClick={this.handleLogout} href="/login">
                              Logout
                              </NavItem>

                          </Nav>

                        : <NavItem>
                            <Link to="/login">Login</Link> | <Link to="/register">Register</Link>
                          </NavItem>

                    }
                </Nav>
            </Navbar>
    );
  }
}

export default Header;
