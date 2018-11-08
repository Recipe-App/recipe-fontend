import AuthService from "../services/AuthService";

const DOMAIN = "https://recipe-app-text.herokuapp.com/"
// const DOMAIN = "http://localhost:3001";
const Auth = new AuthService();

let checkIfToken = () => {
  if (Auth.loggedIn()) {
    let userId = Auth.getUserId();
    return userId;
  }
};

//These are all of our create methods
let createUser = user => {
  return fetch(DOMAIN + "/users", {
    body: JSON.stringify(user),
    headers: {
      "Content-Type": "application/json"
    },
    method: "POST"
  }).then(resp => {
    let json = resp.json();

    return json;
  });
};

let saveRecipes = recipe => {
  return Auth.fetch(DOMAIN + "/saved_recipes", {
    body: JSON.stringify(recipe),
    method: "POST"
  })
    .then(resp => {
      return resp;
    })
    .catch(err => console.log(err));
};

//These are all of our create methods

let sendText = toText => {
  return fetch(DOMAIN + "/grocery_list", {
    body: JSON.stringify(toText),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + Auth.getToken()
    },
    method: "POST"
  }).then(resp => {
    return resp;
  });
};

let getRecipes = pantry => {
  return fetch(
    `https://api.edamam.com/search?q=${pantry}&app_id=${
      process.env.REACT_APP_ID
    }&app_key=${process.env.REACT_APP_KEY}&from=0&to=10`
  )
    .then(rawResponse => {
      return rawResponse.json();
    })

    .then(parasedResponse => {
      return parasedResponse.hits;
    })

    .catch(err => console.log(err));
};

let getProfile = () => {
  return Auth.fetch(DOMAIN + `/users/${checkIfToken()}`);
};

let getSaved = () => {
  return Auth.fetch(DOMAIN + `/saved_recipes/${checkIfToken()}`);
};

//These are all of our delete methods

let deleteRecipe = recipeID => {
  return fetch(DOMAIN + `/saved_recipes/${recipeID}`, {
    body: JSON.stringify(recipeID),
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + Auth.getToken()
    },
    method: "DELETE"
  }).then(resp => {
    let json = resp.json();
    return Promise.resolve(resp);
  });
};

let createPantryItems = function(pantry) {
  return fetch(DOMAIN + "/pantry_items", {
    body: JSON.stringify(pantry),
    headers: {
      "Content-Type": "application/json"
    },
    method: "POST"
  }).then(resp => {
    let json = resp.json();

    return json;
  });
};

let getPantryItems = function(userId) {
  return fetch(DOMAIN + `/pantry_items/${userId}`, {
    method: "GET"
  }).then(resp => {
    let json = resp.json();

    return json;
  });
};

export {
  createUser,
  getRecipes,
  saveRecipes,
  getProfile,
  getSaved,
  deleteRecipe,
  createPantryItems,
  getPantryItems,
  sendText
};
