import React, { Component } from 'react'
import LandingForm from '../components/landingForm'
class Landing extends Component {
    render() {

        return(
            <LandingForm history = {this.props.history}/>
        )
    }
}

export default Landing
