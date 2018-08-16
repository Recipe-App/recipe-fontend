import React, { Component } from 'react'
import '../App.css'
import { getSaved, deleteRecipe, sendText } from '../api/index'

import SavedRecipes from '../components/savedRecipes'


class Saved extends Component {

  constructor(props){
    super(props)
    this.state = {
      saved: []
    }
  }

  componentWillMount(){
    getSaved()
      .then( res =>
        { let saved = this.state
          saved = res.recipes
          console.log(saved);
          this.setState({ saved })})
  }

    render() {
        return(
          <div>
          {this.state.saved.length != 0 &&
            <div>
            <SavedRecipes saved={this.state.saved}/>
            </div>
          }
          </div>
        )
    }
}

export default Saved
