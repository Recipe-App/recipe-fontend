import React, { Component } from 'react'
import { getRecipes, saveRecipes, getPantryItems, deleteRecipe} from '../api/index'
import { Image, Button, Panel } from 'react-bootstrap'
import AuthService from '../services/AuthService'
import ButtonFunction from './button'
import '../App.css'

class NewRecipes extends Component {

    constructor(props){
        super(props)
        this.Auth = new AuthService()
        this.state = {
            apiResp: {
                recipes: []
            },
            saved: [],
            clicked: [false,false,false,false,false,false,false,false,false,false]
        }
    }




    processRecipe(recipe){  //It parses the raw recipe object to send to db
      let toSave = {user_id: "", label: "", ingredients: [], url: "", image: "", }

      // console.log("This is the recipe in processRecipe: ", recipe);
      toSave.user_id = this.Auth.getUserId()
      toSave.label = recipe.label
      toSave.ingredients = recipe.ingredients.map((obj) => {return obj.text}).join()
      toSave.url = recipe.url
      toSave.image = recipe.image

      return toSave
    }

    handleClick(event){  // It adds the clicked recipe into state and prevents duplicate entries

        let id = event.target.id.split(',')  //"id" is an array of two strings.  id[0] is equal to the index of the button.  id[1] is equal to the recipe url for the corresponding button.
        // console.log("This is the id of ");
        let index = parseInt(id[0])
        let url = id[1]
        // console.log("This is the index of the clicked recipe: ", index);
        // console.log("Which is a ", typeof index);
        let { saved } = this.state
        let { recipes } = this.state.apiResp
        let { clicked } = this.state

        clicked[index] = !clicked[index] //The button state is changed
        // console.log("This is the recipes array: ", recipes);

        let recipeObj = recipes.filter(resp => resp.recipe.url === id[1])[0]  //recipeObj is the first element of a 1 element array of a sincle recipe.  recipeObj = [{...}][0] = {...}

        if (clicked[index]){
          console.log("This is the clicked array: ", clicked);

          // console.log(recipeObj);
          let toSave = {recipe: this.processRecipe(recipeObj.recipe)}  //This method works
          saveRecipes(toSave)
              .then( resp => {
                  let { saved } = this.state
                  saved.push(resp)
                  this.setState({ saved, clicked })
              })

        } else {
              let { saved } = this.state

              let toDelete = saved.filter( recipe => recipe.url === url )[0]

              saved = saved.filter( recipe => recipe.url !== url )

              deleteRecipe(toDelete.id)

              this.setState({ saved, clicked })

        }

    }

    componentWillMount(){
      let id = this.Auth.getUserId()
      let array = []
      getPantryItems(id)
      .then(resp => {
        array = [resp.proteins, resp.veggies]
        array = array.join()

        getRecipes(array)
        .then(resp => {
          let { apiResp } = this.state
          let open = Array(resp.length).fill(false)
          apiResp.recipes = resp
          this.setState({ apiResp: apiResp,
                          open: open
                        })
        })

      })
    }




    render() {
      console.log("This is the clicked array from state: ", this.state.clicked);
      console.log("This is the saved array from state", this.state.saved);
        return(
          <div className="flex-container">
          {this.state.apiResp.recipes.map( (element, index) => {
           return (
          <Panel className="flex-item" defaultExpanded>
               <Panel.Heading>
                    <Image src={element.recipe.image} className="image"/><br/>
               </Panel.Heading>
               <Panel.Collapse>
               <Panel.Body collapsible>
               <ButtonFunction id={`${index},${element.recipe.url}`} onClick= {this.handleClick.bind(this)} style={!this.state.clicked[index] ? "danger" : "warning"} text={!this.state.clicked[index] ? "Save Recipe" : "Unsave Recipe"}/>
                    <h3>
                        <a className="title" href={element.recipe.url} target="_blank">{element.recipe.label}</a>
                    </h3>
                    <ul>{element.recipe.ingredients.map((elementTwo) =>{
                      return(
                      <div>
                        <li> {elementTwo.text} </li>
                      </div>
                      )})}
                    </ul>
              </Panel.Body>
              </Panel.Collapse>
          </Panel>
        )})}
        </div>
        )
    }
}

export default NewRecipes
