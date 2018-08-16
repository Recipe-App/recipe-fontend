import React, { Component } from 'react'
import { Button, Modal, OverlayTrigger, Tooltip } from 'react-bootstrap'

import '../App.css'

const tooltip = ( <Tooltip id="tooltip"> remove </Tooltip> )

class GroceryList extends Component {

    render() {

        return(

          <Modal show={this.props.show} onHide={this.props.handleClose} bsSize="small">

              <Modal.Header closeButton>
                  <Modal.Title> Shopping List </Modal.Title>
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

        )
    }
}

export default GroceryList
