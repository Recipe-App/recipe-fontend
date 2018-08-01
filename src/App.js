import React, { Component } from 'react';
<<<<<<< HEAD

=======
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Register from './pages/register.js';
import Login from './pages/login'
import Header from './components/header'
import Landing from './pages/landing'
>>>>>>> master

class App extends Component {
  render() {
    return (
      <div>
<<<<<<< HEAD

=======
        <Router>
        <div>
        <Header />
            <div>
                <Route exact path='/landing' component={Landing} />
                <Route path='/login' component={Login} />
                <Route path='/register' component={Register} />
            </div>
            </div>
        </Router>
>>>>>>> master
      </div>
    );
  }
}

export default App;


// <Register />
