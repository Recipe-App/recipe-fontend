import React, { Component } from 'react'

class GroceryList extends Component {

  constructor(props){
    super(props)
    this.state = {
      saved: this.props.saved,
      ids: [...sessionStorage.getItem('ids')]
    }
  }

    render() {
      // console.log(this.state.ids);
      // console.log(this.state.saved);
        return(
          <div>
          {this.state.ids != undefined &&
            this.state.ids.map((id) => {
            return (
              <div>
              <h1>{this.state.saved[parseInt(id)].label}</h1>
              <h1>{this.state.saved[id].ingredients}</h1>
              </div>
            )
          })
          }
          </div>
        )
    }
}

export default GroceryList
