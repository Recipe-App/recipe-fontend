import AuthService from '../services/AuthService'
const Auth = new AuthService()

const userId = Auth.getUserId()

//These are all of our create methods
let createUser = (user) => {

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

let saveRecipes = (recipe) => {
  return fetch("http://localhost:3001/saved_recipes", {

      body: JSON.stringify(recipe),
      headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + Auth.getToken()


      },
      method: "POST"
  })  .then((resp) => {
          let json = resp.json()

          return json
      })
}

//These are all of our create methods

let getRecipes = (pantry) => {
  return fetch(`https://api.edamam.com/search?q=${pantry}&app_id=88d0fb8a&app_key=1608ffadf6a14d29bd7f096242dd660e&from=0&to=10`)

  .then((rawResponse)=>{
    return rawResponse.json()
  })

  .then((parasedResponse) => {
    return parasedResponse.hits;
  })
}

let getProfile = () => {
  return Auth.fetch(`http://localhost:3001/users/${userId}`)
}

let getSaved = () => {
  return Auth.fetch(`http://localhost:3001/saved_recipes/${userId}`)
}

//These are all of our delete methods

let deleteRecipe = (recipeID) => {
  return fetch(`http://localhost:3001/saved_recipes/${recipeID}`, {

      body: JSON.stringify(recipeID),
      headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + Auth.getToken()
      },
      method: "DELETE"
  })  .then((resp) => {
          console.log(resp);
          let json = resp.json()

          return Promise.resolve(resp);
      })
}

let createPantryItems= function(pantry) {

    return fetch("http://localhost:3001/pantry_items", {

        body: JSON.stringify(pantry),
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

let getPantryItems= function(userId) {

    return fetch(`http://localhost:3001/pantry_items/${userId}`, {

        // body: JSON.stringify(id),
        // headers: {
        //     'Content-Type': 'application/json'
        //
        // },
        method: "GET"
    })
        .then((resp) => {
            let json = resp.json()

            return json
        })
}

export {

  createUser,
  getRecipes,
  saveRecipes,
  getProfile,
  getSaved,
  deleteRecipe,
  createPantryItems,
  getPantryItems

}
