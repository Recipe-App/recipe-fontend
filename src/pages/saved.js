import React, { Component } from 'react'
import '../App.css'
import { getSaved, deleteRecipe, sendText } from '../api/index'

import SavedRecipes from '../components/savedRecipes'


class Saved extends Component {

  constructor(props){
    super(props)
    this.state = {
      saved: [],
      ids: sessionStorage.getItem('ids'),
      show: false,
      groceryList: []
    }
  }

  handleClose = () => {
      this.setState({ show: false });
  }

  handleShow = () => {
      this.setState({ show: true });
  }

  handleClear = () => {
    sessionStorage.setItem('ids', 'placeholder')
    let ids = sessionStorage.getItem('ids')
    let groceryList = []
    this.setState({ ids, groceryList })
  }


  handleAdd = (event) => {
    console.log("I'm Added!");
    let id = event.target.id  //This is the numeric id for the button that was clicked, which corresponds to the recipe id
    let ids =  this.state.ids //create a copy of the ids in state
    let { groceryList } = this.state
    let saved = this.state.saved

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

  handleDelete = (event) => {
    deleteRecipe(event.target.id)
    getSaved()
      .then( res =>
        { let saved = this.state
          saved = res.recipes
          this.setState({ saved })})
  }

  componentWillMount(){
    getSaved()
      .then( res =>
        { let saved = this.state
          saved = res.recipes
          console.log(saved);
          this.setState({ saved })})
  }

    render() {
        return(
          <div>
          {this.state.saved.length != 0 &&
            <div>
            <SavedRecipes show={this.state.show} ids={this.state.ids} handleShow={this.handleShow} handleClose={this.handleClose} handleClear={this.handleClear} handleAdd={this.handleAdd} handleRemove={this.handleRemove} handleDelete={this.handleDelete} saved={this.state.saved}/>
            </div>
          }
          </div>
        )
    }
}

export default Saved
