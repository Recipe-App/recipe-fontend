import React, { Component } from 'react'
import { getSaved } from '../api/index'

import SavedRecipes from '../components/savedRecipes'
import GroceryList from '../components/groceryList'

class Saved extends Component {

  constructor(props){
    super(props)
    this.state = {
      saved: [],
      modalClicked:false
    }
  }

  componentWillMount(){
    getSaved()
      .then( res =>
        {this.setState({ saved: res })})
  }

    render() {
        return(
          <div>
          {this.state.saved.length != 0 &&
            <div>
              <SavedRecipes saved={this.state.saved.recipes}/>
              <GroceryList saved={this.state.saved.recipes}/>
            </div>
        }
          </div>
        )
    }
}

export default Saved
