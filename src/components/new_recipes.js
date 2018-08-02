import React, { Component } from 'react'
import pantryData from '../fakeData/pantryData'

class NewRecipes extends Component {


    componentWillMount(){

    }
    render() {
        return(
            <LoginForm history = {this.props.history}/>
        )
    }
}

export default NewRecipes
