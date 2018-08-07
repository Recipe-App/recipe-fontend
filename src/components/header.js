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
            <Navbar>
                <Navbar.Header>
                    <Navbar.Brand>
                        <Link to='/'>Recipe App</Link>
                    </Navbar.Brand>
                </Navbar.Header>

        <Nav>
            {Auth.loggedIn()

                ? <div>
                  <NavItem onClick={this.handleLogout}>
                    <Link to="/login">Logout</Link>
                  </NavItem>

                  <NavItem>
                    <Link to="/profile">Profile</Link>
                  </NavItem>

                  <NavItem>
                    <Link to="/saved">Saved</Link>
                  </NavItem>
                  </div>

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
