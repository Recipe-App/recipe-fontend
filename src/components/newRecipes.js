import React, { Component } from 'react'
import { getRecipes, saveRecipes } from '../api/index'
import { Image, Button } from 'react-bootstrap'
import AuthService from '../services/AuthService'
// require('dotenv').config()

class NewRecipes extends Component {

    constructor(props){
        super(props)
        this.Auth = new AuthService()
        this.state = {
            apiResp: {
                recipes: []
            },
            saved: {
              recipes:[]
            }
        }
    }

    componentWillMount(){
      let data = ["mexican"]
      let pantry = data.join(',')
      getRecipes(pantry)
          .then(obj => {
            let { apiResp } = this.state
            apiResp.recipes = obj
            this.setState({ apiResp: apiResp })
          })
    }

    processRecipe(rawRecipe){  //It parses the raw recipe object to send to db
      let toSave = {user_id: "", label: "", ingredients: [], url: "", image: ""}
      let recipe = rawRecipe.recipe

      toSave.user_id = this.Auth.getUserId()
      toSave.label = recipe.label
      toSave.ingredients = recipe.ingredients.map((obj) => {return obj.text}).join(',')
      toSave.url = recipe.url
      toSave.image = recipe.image

      return toSave
    }


    handleClick(event){  // It adds the clicked recipe into state and prevents duplicate entries

        let id = event.target.id
        let { saved } = this.state
        let { recipes } = this.state.apiResp

        let toSave = {recipe: this.processRecipe(recipes[id])}  //This method works
        saveRecipes(toSave)
    }

    render() {
        return(
          <div>
          {this.state.apiResp.recipes.map((element, index) => {
            return(
              <form>
              <fieldset>
              <Image src={element.recipe.image} circle/>
              <h1> {element.recipe.label} </h1>
              <a href={element.recipe.url}>{element.recipe.url}</a>
              {element.recipe.ingredients.map((elementTwo) =>{
                return(
                  <div>
                  <h1> {elementTwo.text} </h1><br/>
                  </div>
                )
              })}
              <Button id={`${index}`} bsStyle="danger" onClick={this.handleClick.bind(this)}>Save Recipe</Button><br/>
              </fieldset>
              </form>
            )
          })}
          </div>
        )
    }
}

export default NewRecipes
