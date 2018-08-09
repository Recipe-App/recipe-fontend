import React, { Component } from 'react'
import { Modal, Button } from 'react-bootstrap'

class GroceryList extends Component {

  constructor(props){
    super(props)
    this.state = {
      ids: !null && sessionStorage.getItem('ids')
    }
  }

//TODO
    // processIngredients(array) {  Fix later
    //     array.map((element, index, array) => {
    //       console.log(array);
    //       if (array[index+1] != undefined && array[index+1][0] == ' ') {
    //           return element + array[index + 1]
    //       } else {
    //         return element
    //       }
    //     })
    // }

    render() {
      console.log("This is the saved recipes array in GroceryList", this.props.saved);
        return(
          <Modal show={this.props.show} onHide={this.props.handleClose}         bsSize="small"
>
              <Modal.Header closeButton>
                  <Modal.Title>Shopping List</Modal.Title>
              </Modal.Header>
              <Modal.Body>
              {this.state.ids != undefined ?
                this.state.ids.split(',').map((id) => {
                  let index = parseInt(id)
                  let label = this.props.saved[index].label
                  let ingredients =   this.props.saved[index].ingredients.split(',')
                  return (
                    <div>
                    <h6>{label}</h6>
                    <ul>
                    {ingredients.map((item) => {
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
                  <Button onClick={this.props.handleClose}>Close</Button>
              </Modal.Footer>
          </Modal>

        )
    }
}

export default GroceryList
