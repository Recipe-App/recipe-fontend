import AuthService from '../services/AuthService'
const Auth = new AuthService()

const userId = Auth.getUserId()

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



let getRecipes = (pantry) => {
  return fetch(`https://api.edamam.com/search?q=${pantry}&app_id=88d0fb8a&app_key=1608ffadf6a14d29bd7f096242dd660e&from=0&to=10`)

  .then((rawResponse)=>{
    return rawResponse.json()
  })

  .then((parasedResponse) => {
        return parasedResponse.hits;
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

let getProfile = () => {
  return Auth.fetch(`http://localhost:3001/users/${userId}`)
}

let getSaved = () => {
  return Auth.fetch(`http://localhost:3001/saved_recipes/${userId}`)
}

export {

  createUser,
  getRecipes,
  saveRecipes,
  getProfile,
  getSaved

}
