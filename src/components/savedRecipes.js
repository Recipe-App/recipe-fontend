import React, { Component } from 'react'
import { Image, Button } from 'react-bootstrap'
import AuthService from '../services/AuthService'
import { getSaved } from '../api/index'

class SavedRecipes extends Component {

  constructor(props){
    super(props)
    this.Auth = new AuthService()
    this.state = {
      saved: []
    }
  }

  componentWillMount(){
    getSaved()
      .then( res => {this.setState({ saved: res.recipes })})
  }

  render() {
    console.log(this.state.saved);
      return(
        <div>
        { this.state.saved.length != 0 &&
          this.state.saved.map((recipe) => {
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
            </fieldset>
            </form>
          )
        })}}
        </div>
      )
  }
}

export default SavedRecipes

// <Button id={`${index}`} bsStyle="danger" onClick={this.handleClick.bind(this)}>Save Recipe</Button><br/>
