import React, { Component } from 'react'
import { getRecipes, saveRecipes, getPantryItems, deleteRecipe} from '../api/index'
import { Image, Button, Panel } from 'react-bootstrap'
import AuthService from '../services/AuthService'
import ButtonFunction from './button'
import '../App.css'
// require('dotenv').config()

class NewRecipes extends Component {

    constructor(props){
        super(props)
        this.Auth = new AuthService()
        this.state = {
            apiResp: {
                recipes: []
            },
            saved: {
              recipes:[]
          },
            switchs:{
                array: [true,true,true,true,true,true,true,true,true,true]

            },
            open: []
        }
    }




    processRecipe(rawRecipe){  //It parses the raw recipe object to send to db
      let toSave = {user_id: "", label: "", ingredients: [], url: "", image: ""}
      let recipe = rawRecipe.recipe

      toSave.user_id = this.Auth.getUserId()
      toSave.label = recipe.label
      toSave.ingredients = recipe.ingredients.map((obj) => {return obj.text}).join()
      toSave.url = recipe.url
      toSave.image = recipe.image

      return toSave
    }


    styleChange(x){
        let { switchs } = this.state
        switchs.array[x] = !switchs.array[x] ? true : false
        this.setState({ switchs })



    }

    togglePanel(event){
      console.log(event.target.id);
        let index = event.target.id
        let { open } = this.state

        open[index] = !open[index]

        this.setState({ open })
    }

    handleClick(event){  // It adds the clicked recipe into state and prevents duplicate entries

        let id = event.target.id
        let { saved } = this.state
        let { recipes } = this.state.apiResp
        let { switchs } = this.state
        this.styleChange(id) // this changes the button style
        let toSave = {recipe: this.processRecipe(recipes[id])}  //This method works

        !switchs.array[id] ? saveRecipes(toSave) : deleteRecipe(id)

        // saveRecipes(toSave) // this saves a unique recipe based on Id
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
        return(
          <div className="flex-container">
          {this.state.apiResp.recipes.map((element,index)=>{
           return (
          <Panel className="flex-item" defaultExpanded>
               <Panel.Heading>
                    <Image src={element.recipe.image} className="image"/><br/>
               </Panel.Heading>
               <Panel.Collapse>
               <Panel.Body collapsible>
               <ButtonFunction id={`${index}`} onClick= {this.handleClick.bind(this)} style={this.state.switchs.array[index]? "danger" : "warning"} text={this.state.switchs.array[index]? "Save Recipe" : "Undo"}/>
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
