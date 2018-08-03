import React, { Component } from 'react'
import LandingHeader from '../components/landingHeader'
import LandingForm from '../components/landingForm'

class Landing extends Component {

        render() {
            return(
                <div>
                <LandingHeader />
                <LandingForm />
                </div>
            )
        }
    }

    export default Landing;
