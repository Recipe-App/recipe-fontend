import React, { Component } from 'react';
import { Navbar, NavItem, Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import AuthService from '../services/AuthService'

const Auth = new AuthService()
class Header extends Component {
    handleLogout(){
          Auth.logout()
    }


    render() {
        return (
            <div className="header">
            <Navbar className = "header navbar-fixed-top">
                <Navbar.Header>
                    <Navbar.Brand>
                        <Link to='/'>Recipe App</Link>
                    </Navbar.Brand>
                </Navbar.Header>
                <Nav>
                    {Auth.loggedIn()
                        ? <Nav>
                              <NavItem onClick={this.handleLogout} href="/login">
                                Logout
                              </NavItem>
                              <NavItem href="/profile">
                                Profile
                              </NavItem>
                              <NavItem href="/saved">
                                Saved Recipes
                              </NavItem>
                          </Nav>
                        : <NavItem>
                            <Link to="/login">Login</Link> | <Link to="/register">Register</Link>
                          </NavItem>
                    }
                </Nav>
            </Navbar>

            </div>
    );
  }
}
export default Header;
