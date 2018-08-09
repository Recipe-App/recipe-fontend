import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Header from './components/header'
import Register from './pages/register.js';
import Login from './pages/login'
import Landing from './pages/landing'
import Recipes from './pages/recipes'
import Saved from './pages/saved'
import Profile from './pages/profile'


class App extends Component {
  render() {
    return (
      <div>
      <Router>
      <div>
      <Header />
          <div>
              <Route exact path='/' component={Landing} />
              <Route path='/login' component={Login} />
              <Route path='/register' component={Register} />
              <Route path='/profile' component={Profile} />
              <Route path='/recipes' component={Recipes} />
              <Route path='/saved' component={Saved} />
          </div>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;


// <Register />
