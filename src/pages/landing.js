import React, { Component } from 'react'
import LandingForm from '../components/landingForm'
class Landing extends Component {
    render() {

        return(
            <div>
            <LandingForm history = {this.props.history}/>
            </div>
        )
    }
}

export default Landing
