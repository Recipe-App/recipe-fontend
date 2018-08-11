import React, { Component } from 'react'
import { Image, Button, Modal, Panel } from 'react-bootstrap'
import {deleteRecipe} from '../api/index'
import '../App.css'

import GroceryList from './groceryList'


class SavedRecipes extends Component {

  constructor(props){
    super(props)

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.state = {
        ids: sessionStorage.getItem('ids'),
        show: false,

    }
  }

  handleClose() {
      this.setState({ show: false });
  }

  handleShow() {
      this.setState({ show: true });
  }

  handleRemove(event){
    let toRemove = event.target.id //This is the button id that corresponds to a certin recipe
    if (!this.state.ids.split().includes(',')) { //When there is only one recipe left
        sessionStorage.setItem('ids', "placeholder")
    } else {  //When there is more than one recipe left
          let filteredIds = this.state.ids.split(',').filter( id => id !== toRemove)  //This filter allows all ids in the ids array to pass unless it matches the id that is to be removed

          sessionStorage.setItem('ids', filteredIds)  //The updated ids are saved in session storage and available in state

          this.setState({ ids: filteredIds })
    }
  }

  handleAdd(event){
    let id = event.target.id  //This is the numeric id for the button that was clicked, which corresponds to the recipe id
    let ids =  this.state.ids //create a copy of the ids in state

    if (ids === "placeholder") {  //If the session just has the placeholder
        ids = id
    } else if (ids !== id){  //If there is just one id
          ids = ids + ',' + id;
    } else if (!ids.split(',').includes(id)) {  //If there are already many ids
          ids = ids + ',' + id;
    }

    sessionStorage.setItem("ids", ids)  //Save filtered ids to session storage.  This will be made available in state
    window.location.reload(true)
    this.setState({ids:sessionStorage.getItem('ids')})

  }

  handleDelete(event){
    console.log(event.target.id)
    deleteRecipe(event.target.id)
    window.location.reload(true)
  }


  render() {
    console.log("Here are the IDS from savedRecipes, ", this.state.ids);
      return(

        <div className="flex-container">

        <Button className="list_style" bsSize="large" onClick={this.handleShow}>
        See Grocery List
        </Button>

        <Modal ids={this.state.ids} show={this.props.show} onHide={this.props.handleClose} bsSize="small">
            <Modal.Header closeButton>
                <Modal.Title>Shopping List</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            {




                this.state.groceryList.map((item) => {
                    return (
                      <div>
                          <OverlayTrigger placement="right" overlay={tooltip}>
                              <a className="remove" onClick={this.handleRemove.bind(this)}>
                                  <h5>{item.label}</h5>
                              </a>
                          </OverlayTrigger>

                          <ul>
                          {item.ingredients.split(',').map((item) => {
                            return (
                              <li>{item}</li>
                            )
                          })}
                          </ul>
                      </div>
                    )
                  })

              : <p>There are no ingredients in the shopping list </p>

            }

            </Modal.Body>
            <Modal.Footer>
                <Button onClick={this.handleSubmit}>Text Me</Button>
            </Modal.Footer>
        </Modal>


            {this.props.saved.map((recipe,index)=>{
                return (
                  <Panel className="flex-item">

                      <Panel.Heading>
                           <Image src={recipe.image} className="image"/><br/>
                      </Panel.Heading>

                      <Panel.Body>
                          <Button id={`${recipe.id}`} bsStyle="danger" className="button" onClick={this.handleDelete.bind(this)}>Unsave</Button>

                          <Button id={`${recipe.id}`} bsStyle="success"  className="button" onClick={this.handleAdd.bind(this)}>Add To Grocery List</Button><br/><br/>

                          <h3>
                          <a href={recipe.url} className="title" target="_blank">{recipe.label}</a>
                          </h3>

                          <ul>
                              {recipe.ingredients.split(',').map((ingredient) => {
                                  return(
                                  <div>
                                    <li> {ingredient} </li>
                                  </div>
                                  )
                                                              }
                                                              )
                              }
                          </ul>
                      </Panel.Body>

                  </Panel>
                )
          })}
        </div>

      )
  }
}

export default SavedRecipes
