import React, { Component } from 'react'
import { getRecipes, saveRecipes, getPantryItems, deleteRecipe} from '../api/index'
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
            switchs:{
                array: [true,true,true,true,true,true,true,true,true,true]
        }}
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
      toSave.url = recipe.url
      toSave.image = recipe.image

      return toSave
    }

    styleChange(x){
        let { switchs } = this.state
        switchs.array[x] = !switchs.array[x] ? true : false
        this.setState({ switchs })



    }


    handleClick(event){  // It adds the clicked recipe into state and prevents duplicate entries

        let id = event.target.id
        let { saved } = this.state
        let { recipes } = this.state.apiResp
        let { switchs } = this.state
        this.styleChange(id) // this changes the button style
        let toSave = {recipe: this.processRecipe(recipes[id])}  //This method works

        !switchs.array[id] ? saveRecipes(toSave) : deleteRecipe(id)

        // saveRecipes(toSave) // this saves a unique recipe based on Id
    }





    render() {
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
          <ButtonFunction id={`${index}`} onClick= {this.handleClick.bind(this)} style={this.state.switchs.array[index]? "danger" : "warning"} text={this.state.switchs.array[index]? "Save Recipe" : "Undo"}/>
          </div>
        )})}
        </div>
        )
    }
}

export default NewRecipes
