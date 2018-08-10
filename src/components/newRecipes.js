import React, { Component } from 'react'
import { getRecipes, saveRecipes, getPantryItems } from '../api/index'
import { Image, Button } from 'react-bootstrap'
import AuthService from '../services/AuthService'
import ButtonFunction from './button'
import '../App.css'
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
          },
            switchs: ['danger', 'warning']
        }
    }

    componentWillMount(){
        let id = this.Auth.getUserId()
        let array = []
        getPantryItems(id)
        .then(resp => {
        array = [resp.proteins, resp.veggies]
        array = array.join()

        getRecipes(array)
           .then(obj => {
             let { apiResp } = this.state
             apiResp.recipes = obj
             this.setState({ apiResp: apiResp })
           })

        })
    }

    processRecipe(rawRecipe){  //It parses the raw recipe object to send to db
      let toSave = {user_id: "", label: "", ingredients: [], url: "", image: ""}
      let recipe = rawRecipe.recipe

      toSave.user_id = this.Auth.getUserId()
      toSave.label = recipe.label
      toSave.ingredients = recipe.ingredients.map((obj) => {return obj.text}).join()
      console.log(toSave.ingredients);
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
        console.log(this.state.switchs);
        return(
          <div className="flex-container">
          {this.state.apiResp.recipes.map((element,index)=>{
           return (
          <div className="flex-item">
          <Image src={element.recipe.image} circle/><br/><br/>
          <h3>
          <a href={element.recipe.url} target="_blank">{element.recipe.label}</a></h3>
          <ul>{element.recipe.ingredients.map((elementTwo) =>{
            return(
            <div>
              <li> {elementTwo.text} </li><br/>
            </div>
            )
          })}</ul>
          <ButtonFunction id={`${index}`} onClick= {this.handleClick.bind(this)} style='warning'/>
          </div>
        )})}
        </div>
        )
    }
}

export default NewRecipes
