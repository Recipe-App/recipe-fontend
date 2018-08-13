import React, { Component } from 'react'
import { Modal, Button, OverlayTrigger, Tooltip } from 'react-bootstrap'
import { arrInt } from '../services/DataFormat'

const tooltip = ( <Tooltip id="tooltip"> remove </Tooltip> )


class GroceryList extends Component {
    constructor(props){
      super(props)
      this.state = {
          ids: this.props.ids,
          groceryList: []
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

    // componentWillMount(){
    //     if (this.state.ids != "placeholder") {
    //         let { ids } = this.state
    //         console.log("this.state.ids in the component will mount: ", this.state.ids);
    //         console.log("type of this.state.ids: ",  this.state.ids.split(','));
    //         let groceryList = this.props.saved.filter( savedRecipe =>
    //             ids.split(',').includes(savedRecipe.id)  //Here we filter out all the recipes that we want to show up in the grocery list based on the process ids array from state
    //         )
    //
    //         this.setState({ groceryList })  //Here we are saving the data for the grocery list recipes into state as a staging location before it is sent to the GroceryList component as props
    //     }
    // }

    render() {
        // let { ids } = this.state
        // let groceryList = this.props.saved.filter( savedRecipe =>
        //   ids.split(',').includes(savedRecipe.id)  //Here we filter out all the recipes that we want to show up in the grocery list based on the process ids array from state
        // )
        return(
          <Modal ids={this.state.ids} show={this.props.show} onHide={this.props.handleClose} bsSize="small"
>
              <Modal.Header closeButton>
                  <Modal.Title>Shopping List</Modal.Title>
              </Modal.Header>
              <Modal.Body>
              {
                  this.state.ids !== "placeholder" ?



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

        )
    }
}

export default GroceryList
