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
            <div>
            <SavedRecipes saved={this.state.saved}/>
            <GroceryList saved={this.state.saved}/>

            </div>
        }
          </div>
        )
    }
}

export default Saved
