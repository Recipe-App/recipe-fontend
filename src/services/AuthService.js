import decode from 'jwt-decode';
export default class AuthService {
    constructor(domain) {
        this.domain = domain || 'http://localhost:3001' // We can pass in the backend server, or use a default for dev
        this.fetch = this.fetch.bind(this)
        this.login = this.login.bind(this)
        this.getUserId = this.getUserId.bind(this)
    }

    login(email, password) {
        console.log(password,email);
      return this.fetch(`${this.domain}/user_token`, { // Our backend endpoint
        method: 'POST',
        body: JSON.stringify({
          auth: { // We pass in email and password from the login form
            email,
            password
          }
        })
      }).then(res => {
        this.setToken(res.jwt)
        return Promise.resolve(res);
      })
    }

    loggedIn() { // A check to see if user is logged in
      const token = this.getToken()
      return !!token && !this.isTokenExpired(token)
    }

    // Tokens are only valid for a certain period of time, determined by the server.
    // When the one used by the React application, another one needs to be fetched.
    isTokenExpired(token) {
      try {
        const decoded = decode(token);
        if (decoded.exp < 0) {  //Replaced Date.now() / 1000 with 0 for development purposes
          return true;
        }
        else
          return false;
      }
      catch (err) {
        return false;
      }
    }

    // The token is stored in the browser
    setToken(idToken) {
      localStorage.setItem('id_token', idToken)
    }

    // Fetch the token from local storage
    getToken() {
      return localStorage.getItem('id_token')
    }

    // Removes the token
    logout() {
      localStorage.removeItem('id_token');
    }

    // We can decode the token and find the user's ID for subsequent calls to the server
    getUserId() {
      const token = decode(this.getToken());
      return token.sub
    }

    // Enhance the standard version of fetch() by
    // adding the authentication headers into every request
    fetch(url, options) {
      const headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }

      if (this.loggedIn()) {
        headers['Authorization'] = 'Bearer ' + this.getToken()
      }

      return fetch(url, {
        headers,
        ...options
      })
      .then(this._checkStatus)
      .then(response => response.json())

    }

    _checkStatus(response) {
      if (response.status >= 200 && response.status < 300) {
        return response
      } else {
        var error = new Error(response.statusText)
        error.response = response
        throw error
      }
   }
}
