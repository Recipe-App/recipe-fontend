import React, { Component } from 'react'
import LandingHeader from '../components/landingHeader'
import LandingForm from '../components/landingForm'

class Landing extends Component {

        render() {
            return(
                <div>
                {this.props.success &&
                    <Redirect to="/landing" />}
                    </div>
            )
        }
    }

    export default Landing;
