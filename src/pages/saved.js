import React, { Component } from 'react'
import AuthService from '../services/AuthService'
import getSaved from '../api/index'
import SavedRecipes from '../components/savedRecipes'

class Saved extends Component {

    render() {
        return(
          <SavedRecipes />
        )
    }
}

export default Saved
