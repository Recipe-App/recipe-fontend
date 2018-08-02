import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Register from './pages/register.js';
import Login from './pages/login'
import Header from './components/header'
import Landing from './pages/landing'
import AccountInfo from './components/AccountInfo'
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
            </div>
            </div>
        </Router>
      </div>
    );
  }
}

export default App;


// <Register />
