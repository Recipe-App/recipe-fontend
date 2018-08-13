import React, { Component } from 'react'
import { Image, Button, Modal, Panel, OverlayTrigger, Tooltip } from 'react-bootstrap'
import { deleteRecipe } from '../api/index'
import '../App.css'

import GroceryList from './groceryList'

const tooltip = ( <Tooltip id="tooltip"> remove </Tooltip> )

class SavedRecipes extends Component {

  constructor(props){
    super(props)

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.state = {
        ids: sessionStorage.getItem('ids'),
        show: false,
        groceryList: []

    }
  }

  handleClose() {
      this.setState({ show: false });
  }

  handleShow() {
      this.setState({ show: true });
  }

  handleRemove = (event) => {
    console.log("This is the event in handleRemove: ", event.target.id);
    let toRemove = String(event.target.id) //This is the button id that corresponds to a certin recipe
    console.log("toRemove: ", toRemove
    );
    if (!this.state.ids.split("").includes(',')) { //When there is only one recipe left
        sessionStorage.setItem('ids', "placeholder")
        let ids = sessionStorage.getItem('ids', "placeholder")
        let groceryList = []

        this.setState({ ids, groceryList })

    } else {  //When there is more than one recipe left
          console.log(this.state.ids.split(','))


          let ids = this.state.ids.split(',').filter( id => {
            console.log(typeof id)
            console.log(typeof toRemove)
            console.log(id !== toRemove);

            return(id !== toRemove)})  //This filter allows all ids in the ids array to pass unless it matches the id that is to be removed
          console.log("These are the updated ids: ", ids);
          sessionStorage.setItem('ids', ids)  //The updated ids are saved in session storage and available in state
          ids = sessionStorage.getItem('ids')
          let groceryList = this.props.saved.filter(( savedRecipe => ids.includes(String(savedRecipe.id))))

          this.setState({ ids, groceryList })
    }

  }

  handleAdd(event){
    let id = event.target.id  //This is the numeric id for the button that was clicked, which corresponds to the recipe id
    let ids =  this.state.ids //create a copy of the ids in state
    let { groceryList } = this.state
    let saved = this.props.saved

    if (ids === "placeholder") {  //If the session just has the placeholder
        ids = id
        groceryList = saved.filter(( savedRecipe => savedRecipe.id == ids ))  //Here ids should just have one number
    } else if (ids !== id){  //If there is just one id
          ids = ids + ',' + id
          groceryList = saved.filter(( savedRecipe => ids.split(',').includes(String(savedRecipe.id))))  //Here ids should have more than
    } else if (!ids.split(',').includes(id)) {  //If there are already many ids
          ids = ids + ',' + id;
          groceryList = saved.filter(( savedRecipe => ids.split(',').includes(String(savedRecipe.id))))  //Here ids should have more than
    }

    sessionStorage.setItem("ids", ids)  //Save filtered ids to session storage.  This will be made available in state

    this.setState({ ids: sessionStorage.getItem('ids'),
                    groceryList: groceryList })

  }

  handleDelete(event){
    console.log(event.target.id)
    deleteRecipe(event.target.id)
    window.location.reload(true)
  }


  render() {
    console.log("Id Array: ", this.state.ids);
    console.log("Recipes in Grocery List: ", this.state.groceryList);
    // console.log("Saved Recipes Array: ", this.props.saved);
      return(

        <div className="flex-container">

        <Button className="list_style" bsSize="large" onClick={this.handleShow}>
        See Grocery List
        </Button>

        <Modal show={this.state.show} onHide={this.handleClose} bsSize="small">
            <Modal.Header closeButton>
                <Modal.Title>Shopping List</Modal.Title>
            </Modal.Header>

            <Modal.Body>
            { this.state.ids == "placeholder" ?

                  <p>There are no ingredients in the shopping list </p>

              :   this.state.groceryList.map((item) => {
                      return (
                        <div>
                            <OverlayTrigger  onClick={this.handleRemove} placement="right" overlay={tooltip}>
                                <div>
                                    <h5 id={`${item.id}`}>{item.label}</h5>
                                </div>
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



            }
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={this.handleSubmit}>Text Me</Button>
            </Modal.Footer>
        </Modal>

            { this.props.saved.map((recipe,index)=>{
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
