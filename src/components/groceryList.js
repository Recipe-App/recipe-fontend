import React, { Component } from 'react'
import { Modal, Button } from 'react-bootstrap'

class GroceryList extends Component {

  constructor(props){
    super(props)
    this.state = {
      ids: !null && sessionStorage.getItem('ids')
    }
  }

    render() {
      console.log("This is the saved recipes array in GroceryList", this.props.saved);
        return(
          <Modal show={this.props.show} onHide={this.props.handleClose}>
              <Modal.Header closeButton>
                  <Modal.Title>Shopping List</Modal.Title>
              </Modal.Header>
              <Modal.Body>
              {this.state.ids != undefined ?
                this.state.ids.split(',').map((id) => {
                  let index = parseInt(id)
                  return (
                    <div>
                    <h1>{this.props.saved[index].label}</h1>
                    <h1>{this.props.saved[index].ingredients}</h1>
                    </div>
                  )
                })

                : <p>There are no ingredients in the shopping list </p>

              }

              </Modal.Body>
              <Modal.Footer>
                  <Button onClick={this.props.handleClose}>Close</Button>
              </Modal.Footer>
          </Modal>

        )
    }
}

export default GroceryList
