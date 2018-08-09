import React, { Component } from 'react'
import { Image, Button, Modal } from 'react-bootstrap'
import {deleteRecipe} from '../api/index'
import '../App.css'

import GroceryList from './groceryList'



class SavedRecipes extends Component {

  constructor(props){
    super(props)

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.state = {
      show: false
    }
  }

  handleClose() {
      this.setState({ show: false });
  }

  handleShow() {
      this.setState({ show: true });
  }

  handleClick(event){
    let id = parseInt(event.target.id)
    console.log(id);
    let ids = sessionStorage.getItem("ids").split(',')

    !ids.includes(String(id)) && ids.push(id)

    let filtered_ids = ids.filter(id => id != "placeholder")

    sessionStorage.setItem("ids", filtered_ids)
  }

  handleDelete(event){
    console.log(event.target.id)
    deleteRecipe(event.target.id)
    window.location.reload(true)


  }

  render() {
      return(

        <div className="flex-container">

        <GroceryList saved={this.props.saved} show={this.state.show} handleClose={this.handleClose}/>

        <Button className="button" bsSize="large" onClick={this.handleShow}>
          See Grocery List
        </Button>



            {this.props.saved.map((recipe,index)=>{
                return (
                  <div className="flex-item">
                      <Image src={recipe.image} circle/><br/><br/>
                      <h3>
                      <a href={recipe.url} target="_blank">{recipe.label}</a></h3>
                      <ul>
                          {recipe.ingredients.split(',').map((ingredient) =>{
                              return(
                              <div>
                                <li> {ingredient} </li>
                              </div>
                              )
                                }
                                                          )
                          }
                      </ul>
                      <Button id={`${recipe.id}`} bsStyle="danger" onClick={this.handleDelete.bind(this)}>Unsave</Button>

                      <Button id={`${index}`} bsStyle="success" onClick={this.handleClick.bind(this)}>Add To Grocery List</Button><br/><br/><br/>
                  </div>
                )
        })}
        </div>

      )
  }
}

export default SavedRecipes
