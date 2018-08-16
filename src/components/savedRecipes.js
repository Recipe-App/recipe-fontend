import React, { Component } from 'react'
import { Image, Button, Panel } from 'react-bootstrap'
import '../App.css'

class SavedRecipes extends Component {

  render() {

      return(

          <div className="flex-container">

              { this.props.saved.map((recipe,index)=>{
                    return (
                        <Panel className="flex-item">

                            <Panel.Heading>
                                 <Image src={recipe.image} className="image"/><br/>
                            </Panel.Heading>

                            <Panel.Body>
                                <Button id={`${recipe.id}`} bsStyle="danger" className="button" onClick={this.props.handleDelete}>Unsave</Button>

                                <Button id={`${recipe.id}`} bsStyle="success"  className="button" onClick={this.props.handleAdd}>Add To Grocery List</Button><br/><br/>

                                <h3>
                                <a href={recipe.url} className="title" target="_blank">{recipe.label}</a>
                                </h3>

                                <ul>
                                    { recipe.ingredients.split('//').map( ingredient => {
                                        return(
                                        <div>
                                          <li> {ingredient} </li>
                                        </div>
                                        )
                                                                    }
                                                                    )
                                    }
                                </ul>
                            </Panel.Body>

                        </Panel>
                    )
              })}

          </div>

      )
  }
}

export default SavedRecipes
