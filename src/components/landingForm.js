import React, {Component} from 'react'
import { ControlLabel, Button, FormControl, FormGroup} from 'react-bootstrap'
import {createPantryItems, getPantryItems} from '../api/index'
import AuthService from '../services/AuthService';

class LandingForm extends Component{
    constructor(props){
        super(props)
        this.Auth = new AuthService()
        this.state = {
            form: {
                pantry_item: {
                    user_id: "",
                    proteins: "",
                    veggies: "",
                    grains: "",
                    seasonings: "",
                    other: "",
                }
            }
        }
    }
    handleChange(event){
        let {form} = this.state
        form.pantry_item[event.target.name]= event.target.value
        this.setState({form: form})

    }
    handleSubmit(event){
        event.preventDefault()
        let { form } = this.state
        form.pantry_item.user_id = this.Auth.getUserId()

        createPantryItems(form)
        .then(successPantry => {
            this.props.history.replace('/recipes')


        })


}




    render() {
        return(
                <form onSubmit={this.handleSubmit.bind(this)}>
                    <FormGroup>
                        <ControlLabel>Protein</ControlLabel>
                            <FormControl
                                type='text'
                                name='proteins'
                                value={this.state.value}
                                placeholder="Enter Protein"
                                onChange={this.handleChange.bind(this)}/>

                        <ControlLabel>Vegetables</ControlLabel>
                            <FormControl
                                type='text'
                                name='veggies'
                                value={this.state.value}
                                placeholder="Enter Vegetables"
                                onChange={this.handleChange.bind(this)}/>

                        <ControlLabel>Grains</ControlLabel>
                            <FormControl
                                type='text'
                                name='grains'
                                value={this.state.value}
                                placeholder="Enter Grains"
                                onChange={this.handleChange.bind(this)}/>

                        <ControlLabel>Spices</ControlLabel>
                            <FormControl
                                type='text'
                                name='seasonings'
                                value={this.state.value}
                                placeholder="Enter Spices"
                                onChange={this.handleChange.bind(this)}/>

                        <ControlLabel>Other</ControlLabel>
                            <FormControl
                                type='text'
                                name='other'
                                value={this.state.value}
                                placeholder="Other"
                                onChange={this.handleChange.bind(this)}/>


                        <Button bsStyle="primary" type='submit' value='submit'>submit</Button>

                </FormGroup>
            </form>
        )
    }
}

export default LandingForm;
