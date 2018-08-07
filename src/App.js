import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Register from './pages/register.js';
import Login from './pages/login'
import LandingForm from './components/landingForm'
import Header from './components/header'
import AccountInfo from './components/AccountInfo'

class App extends Component {
  render() {
    return (
      <div>
        <Router>
        <div>
            <div>
                <Route path='/landing' render ={props =>
                <div>
                    <Header />
                    <LandingForm />
                </div>
            } />
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
