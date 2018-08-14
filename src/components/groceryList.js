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

    render() {

        return(
          <div>
          </div>
        )

    }}

export default GroceryList
