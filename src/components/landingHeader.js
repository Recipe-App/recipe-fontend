import React, { Component } from 'react'
import { Navbar, NavItem, Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import AuthService from '../services/AuthService'

const Auth = new AuthService()

class LandingHeader extends Component {

    handleLogout(){
          Auth.logout()
    }

    render() {
        return (
            <Navbar>
                <Navbar.Header>
                    <Navbar.Brand>
                        <Link to='/landing'>Recipe App</Link>
                    </Navbar.Brand>
                </Navbar.Header>
                <Navbar.Header>
                    <Navbar.Brand>
                        <Link to='/landing'>Saved Recipes</Link>
                    </Navbar.Brand>
                </Navbar.Header>
                <Navbar.Header>
                    <Navbar.Brand>
                        <Link to='/landing'>Account Info</Link>
                    </Navbar.Brand>
                </Navbar.Header>
                <Navbar.Header>
                    <Navbar.Brand>
                        <Link to='/landing'>Cart</Link>
                    </Navbar.Brand>
                </Navbar.Header>

        <Nav>
            {Auth.loggedIn()

                ? <div><NavItem onClick={this.handleLogout}>
                    <Link to="/logout">Logout</Link>
                </NavItem></div>

                : <NavItem>
                    <Link to="/landing">Home</Link> |

                    <Link to="/landing">Logout</Link> 
                </NavItem>
            }
        </Nav>
        </Navbar>
    );
  }
}

export default LandingHeader;
