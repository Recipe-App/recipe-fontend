let createUser = function(user) {

    return fetch("http://localhost:3001/users", {

        body: JSON.stringify(user),
        headers: {
            'Content-Type': 'application/json'

        },
        method: "POST"
    })
        .then((resp) => {
            let json = resp.json()

            return json
        })
}

export default createUser

require('dotenv').config()

let getRecipes = function(pantry) {
  return fetch(`https://api.edamam.com/search?q=${pantry}&app_id=${process.env.REACT_APP_ID_CODE}&app_key=${process.env.REACT_APP_KEY}&from=0&to=10`)

  .then((rawResponse)=>{
    return rawResponse.json()
  })

  .then((parasedResponse) => {
        let {recipeArray} = this.state
        recipeArray = parasedResponse.hits
    })
}
