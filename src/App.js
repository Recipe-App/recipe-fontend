import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Register from './pages/register.js';
import Login from './pages/login'
import LandingForm from './pages/landing'
import LandingHeader from './pages/landing'
import LandingNavbar from './pages/landing'




class App extends Component {
  render() {
    return (
      <div>
        <Router>
        <div>
            <div>
                <Route path='/landing' component={LandingHeader, LandingForm, LandingNavbar} />
                <Route path='/login' component={Login} />
                <Route path='/register' component={Register} />
            </div>
            </div>
        </Router>
      </div>
    );
  }
}

export default App;


// <Register />
