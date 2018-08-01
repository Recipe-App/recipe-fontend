import React, { Component } from 'react';
require('dotenv').config()

class ApiForm extends Component {
  constructor(props){
    super(props);
    this.state={
      recipeArray: []
    }
  }

  componentWillMount(){
    fetch(`https://api.edamam.com/search?q=fish,carrot,salsa&app_id=${process.env.REACT_APP_ID_CODE}&app_key=${process.env.REACT_APP_KEY}&from=0&to=10`)

    .then((rawResponse)=>{
      return rawResponse.json()
    })

    .then((parasedResponse) => {
          let {recipeArray} = this.state
          recipeArray = parasedResponse.hits
          this.setState({recipeArray})
      })
}

  render() {
    if (this.state.recipeArray.length > 0){
          console.log(this.state.recipeArray);
    }


    return (
      <div>
        {this.state.recipeArray.map((element) => {
          return(
            <div>
            <img src={element.recipe.image}/>
            <h1> {element.recipe.label} </h1>
            <a href={element.recipe.url}>{element.recipe.url}</a>
            {element.recipe.ingredients.map((elementTwo) =>{
              return(
                <div>
                <h1> {elementTwo.text} </h1>

                </div>
              )
            })}
            </div>
          )
        })}
      </div>
    );
  }
}

export default ApiForm;



// parasedResponse.hits[0].recipe.label  The name of the [0] recipe
// parasedResponse.hits[0].recipe.image This a image of the json
// parasedResponse.hits[0].recipe.url This is a url
// parasedResponse.hits[0].recipe.ingredients This is a array of
