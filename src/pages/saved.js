import React, { Component } from 'react'
import '../App.css'
import { getSaved } from '../api/index'

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
        {this.setState({ saved: res })})
  }

    render() {
        return(
          <div>
          {this.state.saved.length != 0 ?

            <div>
            <SavedRecipes saved={this.state.saved.recipes}/>
            </div>

            :

            <div className="saved">
              <h1>You Currently Have No Saved Recipes</h1>
            </div>
        }
          </div>
        )
    }
}

export default Saved
