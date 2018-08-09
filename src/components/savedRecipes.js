import React, { Component } from 'react'
import { Image, Button } from 'react-bootstrap'
import {deleteRecipe} from '../api/index'


class SavedRecipes extends Component {

  constructor(props){
    super(props)
    this.state = {
      ids: []
    }
  }

  handleClick(event){
    let id = parseInt(event.target.id)
    let { ids } = this.state
    let { saved } = this.state

    !ids.includes(id) && ids.push(id)
    sessionStorage.setItem("ids", ids)
  }

  handleDelete(event){
    console.log(event.target.id)
    deleteRecipe(event.target.id)
    window.location.reload(true)


  }

  render() {
      return(
        <div className="SavedRecipes">
        {
          this.props.saved.recipes.map((recipe,index) => {
          return(
            <form>
            <fieldset>
            <Image src={recipe.image} circle/>
            <h1> {recipe.label} </h1>
            <a href={recipe.url}>{recipe.url}</a>
            const recipeID = {recipe.id}

            {recipe.ingredients.split().map((item) =>{
              return(
                <div>
                <h1> {item} </h1><br/>
                </div>
              )
            })}
            <Button id={`${recipe.id}`} bsStyle="danger" onClick={this.handleDelete.bind(this)}>Unsave</Button>

            <Button id={`${index}`} bsStyle="success" onClick={this.handleClick.bind(this)}>Add To Grocery List</Button><br/><br/><br/>
            </fieldset>
            </form>
          )
        })}
        </div>
      )
  }
}

export default SavedRecipes
