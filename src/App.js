import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Register from './pages/register.js';
import Login from './pages/login'
import Header from './components/header'
import Landing from './pages/landing'
import AccountInfo from './components/AccountInfo'
import NewRecipes from './components/newRecipes'
import Saved from './pages/saved'


class App extends Component {
  render() {
    return (
      <div>
        <Router>
        <div>
        <Header />
            <div>
                <Route exact path='/landing' component={Landing} />
                <Route path='/login' component={Login} />
                <Route path='/register' component={Register} />
                <Route path='/account' component={AccountInfo} />
                <Route path='/recipes' component={NewRecipes} />
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
