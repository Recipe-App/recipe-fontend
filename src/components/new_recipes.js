import React, { Component } from 'react'
import getRecipes from '../api/index'
import { Image, Button } from 'react-bootstrap'

// require('dotenv').config()

class NewRecipes extends Component {

    constructor(props){
        super(props)
        this.state = {
            apiResp: {
                recipes: []
            },
            saved: []
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

    handleClick(event){

        let id = event.target.id
        console.log(id);
        let { saved } = this.state
        let { recipes } = this.state.apiResp

        let savedUrls = saved.map((element) => {
          return element.recipe.url
        })

        if(!savedUrls.includes(recipes[id].recipe.url)){
          saved.push(recipes[id])
          this.setState({ saved: saved })
        }

        console.log(this.state.saved);
    }

    render() {
        return(
          <div>
          {this.state.apiResp.recipes.map((element, index) => {
            return(
              <form onClick={this.handleClick.bind(this)}>
              <Image src={element.recipe.image} circle/>
              <h1> {element.recipe.label} </h1>
              <a href={element.recipe.url}>{element.recipe.url}</a>
              {element.recipe.ingredients.map((elementTwo) =>{
                return(
                  <div>
                  <h1> {elementTwo.text} </h1>
                  </div>
                )
              })}
              <Button id={`${index}`} bsStyle="danger">Save Recipe</Button>
              </form>
            )
          })}
          </div>
        )
    }
}

export default NewRecipes
