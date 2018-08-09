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
      ids: [],
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
    let { ids } = this.state

    !ids.includes(id) && ids.push(id)

    sessionStorage.setItem("ids", ids)
  }

  handleDelete(event){
    console.log(event.target.id)
    deleteRecipe(event.target.id)
    window.location.reload(true)


  }

  render() {
    console.log(this.state.show);
      return(

        <div className="flex-container">

        <GroceryList saved={this.props.saved} show={this.state.show} handleClose={this.handleClose}/>

        <Button bsStyle="primary" bsSize="large" onClick={this.handleShow}>
          See Grocery List
        </Button>



            {this.props.saved.map((recipe,index)=>{
                return (
                  <div className="flex-item">
                      <Image src={recipe.image} circle/><br/><br/>
                      <h3>
                      <a href={recipe.url}>{recipe.label}</a></h3>
                      <ul>
                          {recipe.ingredients.split('////').map((ingredient) =>{
                              return(
                              <div>
                                <li> {ingredient} </li><br/>
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


// <Modal className="modal" show={this.state.show} onHide={this.handleClose} >
// <Modal.Header closeButton>
// <Modal.Title>Shopping List</Modal.Title>
// </Modal.Header>
// <Modal.Body>
// <p>
// Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
// dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta
// ac consectetur ac, vestibulum at eros.
// </p>
// </Modal.Body>
// <Modal.Footer>
// <Button onClick={this.handleClose}>Close</Button>
// </Modal.Footer>
// </Modal>
