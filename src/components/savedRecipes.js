import React, { Component } from 'react'
import { Image, Button } from 'react-bootstrap'


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

  handleDelete(){

  }

  render() {
      return(
        <div>
        {
          this.props.saved.recipes.map((recipe,index) => {
          return(
            <form>
            <fieldset>
            <Image src={recipe.image} circle/>
            <h1> {recipe.label} </h1>
            <a href={recipe.url}>{recipe.url}</a>

            {recipe.ingredients.split().map((item) =>{
              return(
                <div>
                <h1> {item} </h1><br/>
                </div>
              )
            })}
            <Button id={`${index}`} bsStyle="danger" onClick={this.handleDelete.bind(this)}>Unsave</Button>

            <Button id={`${index}`} bsStyle="success" onClick={this.handleClick.bind(this)}>Add To Grocery List</Button><br/><br/><br/>
            </fieldset>
            </form>
          )
        })}}
        </div>
      )
  }
}

export default SavedRecipes
