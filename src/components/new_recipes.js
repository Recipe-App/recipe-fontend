import React, { Component } from 'react'
import getRecipes from '../api/index'

// require('dotenv').config()

class NewRecipes extends Component {

    constructor(props){
        super(props)
        this.state = {
            apiResp: {
                recipes: []
            }
        }
    }

    componentWillMount(){
      let data = ["beef", "carrots", "onions"]
      let pantry = data.join(',')
      getRecipes(pantry)
          .then(obj => {
            let { apiResp } = this.state
            apiResp.recipes = obj
            this.setState({ apiResp: apiResp })
          })
    }

    render() {
      console.log(this.state.apiResp.recipes)
        return(
          <div>
          {this.state.apiResp.recipes.map((element) => {
            return(
              <div onClick={this.handleClick.bind(this)}>
              <img src={element.recipe.image}/>
              <h1> {element.recipe.label} </h1>
              <a href={element.recipe.url}>{element.recipe.url}</a>
              {element.recipe.ingredients.map((elementTwo) =>{
                return(
                  <div>
                  <h1> {elementTwo.text} </h1>

                  </div>
                )
              })}
              </div>
            )
          })}
          </div>
        )
    }
}

export default NewRecipes
