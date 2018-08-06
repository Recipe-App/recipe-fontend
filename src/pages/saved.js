import React, { Component } from 'react'
import { getSaved } from '../api/index'

import SavedRecipes from '../components/savedRecipes'
import GroceryList from '../components/groceryList'

class Saved extends Component {

  constructor(props){
    super(props)
    this.state = {
      saved: []
    }
  }

  componentWillMount(){
    getSaved()
      .then( res => {this.setState({ saved: res })})
  }

    render() {
      console.log("This is the state for Saved",this.state.saved);
        return(
          <div>
          {this.state.saved.length != 0 &&
            <SavedRecipes saved={this.state.saved}/>
          }
          </div>
        )
    }
}

export default Saved

// <GroceryList saved={this.state.saved}/>
