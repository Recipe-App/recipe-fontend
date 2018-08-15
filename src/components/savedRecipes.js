import React, { Component } from 'react'
import { Image, Button, Modal, Panel, OverlayTrigger, Tooltip } from 'react-bootstrap'
import { deleteRecipe, sendText } from '../api/index'
import '../App.css'

const tooltip = ( <Tooltip id="tooltip"> remove </Tooltip> )

class SavedRecipes extends Component {

  constructor(props){
    super(props)

    this.state = {
        ids: sessionStorage.getItem('ids'),
        show: false,
        groceryList: []

    }
  }

  handleSubmit = () => {

    this.state.groceryList.forEach( recipe => {
      let toText = { text: { message: `-\n\n//${recipe.label}// \n\n${recipe.ingredients.split(',').map( string => typeof(parseInt(string[0])) === "number" ? "- " + string + "\n" : "  " + string + "\n").join('')}`}}
      sendText(toText)
          .then(resp => console.log(resp))
    })
  }

  handleClose = () => {
      this.setState({ show: false });
  }

  handleShow = () => {
      this.setState({ show: true });
  }

  handleClear = () => {
    let ids = "placeholder"
    let groceryList = []
    this.setState({ ids, groceryList })
  }

  handleRemove = (event) => {
    let toRemove = String(event.target.id) //This is the button id that corresponds to a certin recipe
    let groceryList

    if (!this.state.ids.split("").includes(',')) { //When there is only one recipe left
        sessionStorage.setItem('ids', "placeholder")
        groceryList = []

    } else {  //When there is more than one recipe left

          let updatedIds = this.state.ids.split(',').filter( id => id !== toRemove )  //This filter allows all ids in the ids array to pass unless it matches the id that is to be removed
          sessionStorage.setItem('ids', updatedIds)  //The updated ids are saved in session storage and available in state

          groceryList = this.props.saved.filter(( savedRecipe => updatedIds.includes(String(savedRecipe.id))))

    }

    let ids = sessionStorage.getItem('ids')

    this.setState({ ids, groceryList })

  }

  handleAdd = (event) => {
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

  handleDelete = (event) => {
    deleteRecipe(event.target.id)
    window.location.reload(true)
  }


  render() {

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
                <Button onClick={this.handleClear}>Clear</Button>
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
