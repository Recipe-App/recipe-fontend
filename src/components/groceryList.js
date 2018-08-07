import React, { Component } from 'react'

class GroceryList extends Component {

  constructor(props){
    super(props)
    this.state = {
      ids: sessionStorage.getItem('ids').split(',')
    }
  }

    render() {
      console.log(this.state.ids);
        return(
          <div>
          {this.state.ids != undefined &&
            this.state.ids.map((id) => {
            return (
              <div>
              <h1>{this.props.saved.recipes[parseInt(id)].label}</h1>
              <h1>{this.props.saved.recipes[parseInt(id)].ingredients}</h1>
              </div>
            )
          })
          }
          </div>
        )
    }
}

export default GroceryList
