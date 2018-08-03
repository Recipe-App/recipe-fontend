import React, { Component } from 'react'
import NewRecipes from '../components/new_recipes'
import AuthService from '../services/AuthService'

import getSaved from '../api/index'

class Recipes extends Component {
  constructor(props){
      super(props)
      this.Auth = new AuthService()
      this.state = {
          saved: []
          }
      }
  }


  componentWillMount(){
    const userId = Auth.getUserId()
    Auth.fetch(`http://localhost:3001/saved_recipes/${userId}`).then( res => {
      this.setState({ saved: res })
    })
  }
    render() {
        return(
          <NewRecipes />
        )
    }
}

export default Recipes
