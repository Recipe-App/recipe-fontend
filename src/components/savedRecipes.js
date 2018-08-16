import React, { Component } from 'react'
import { Image, Button, Modal, Panel, OverlayTrigger, Tooltip } from 'react-bootstrap'
import { deleteRecipe, sendText } from '../api/index'
import '../App.css'

const tooltip = ( <Tooltip id="tooltip"> remove </Tooltip> )

class SavedRecipes extends Component {

  render() {
      console.log("First Ingredient: ", this.props.saved[0].ingredients.split('//').forEach(item => console.log(item)))
      console.log(typeof this.props.saved[0].ingredients.split('//'));
      return(

        <div className="flex-container">

        <Button className="list_style" bsSize="large" onClick={this.props.handleShow}>
        See Grocery List
        </Button>

        <Modal show={this.props.show} onHide={this.props.handleClose} bsSize="small">
            <Modal.Header closeButton>
                <Modal.Title>Shopping List</Modal.Title>
            </Modal.Header>

            <Modal.Body>
            { this.props.ids == "placeholder" ?

                  <p>There are no ingredients in the shopping list </p>

              :   this.props.saved.map((recipe) => {
                      return (
                        <div>
                            <OverlayTrigger  onClick={this.props.handleRemove} placement="right" overlay={tooltip}>
                                <div>
                                    <h5 id={`${recipe.id}`}>{recipe.label}</h5>
                                </div>
                            </OverlayTrigger>

                            <ul>
                            {recipe.ingredients.split('//').map((item) => {
                              return (
                                <li>{ item }</li>
                              )
                            })}
                            </ul>
                        </div>
                      )
                  })
            }

            </Modal.Body>
            <Modal.Footer>
                <Button onClick={this.props.handleClear}>Clear</Button>
                <Button onClick={this.props.handleSubmit}>Text Me</Button>
            </Modal.Footer>
        </Modal>

            { this.props.saved.map((recipe,index)=>{
                return (
                  <Panel className="flex-item">

                      <Panel.Heading>
                           <Image src={recipe.image} className="image"/><br/>
                      </Panel.Heading>

                      <Panel.Body>
                          <Button id={`${recipe.id}`} bsStyle="danger" className="button" onClick={this.props.handleDelete}>Unsave</Button>

                          <Button id={`${recipe.id}`} bsStyle="success"  className="button" onClick={this.props.handleAdd}>Add To Grocery List</Button><br/><br/>

                          <h3>
                          <a href={recipe.url} className="title" target="_blank">{recipe.label}</a>
                          </h3>

                          <ul>
                              { recipe.ingredients.split('//').map( ingredient => {
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
