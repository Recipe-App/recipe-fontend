import React, { Component } from 'react';
import Register from './pages/register.js';
import Login from './pages/login'

class App extends Component {
  render() {
    return (
      <div>
        <Login />
        <Register />
      </div>
    );
  }
}

export default App;
