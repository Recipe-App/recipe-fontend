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
