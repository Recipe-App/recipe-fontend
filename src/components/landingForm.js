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
componentWillMount(){
    let id = this.Auth.getUserId()
    let array = []
    getPantryItems(id)
    .then(resp => {
        let { form } = this.state
        form.pantry_item.proteins = resp.proteins
        form.pantry_item.veggies = resp.veggies
        form.pantry_item.grains = resp.grains
        form.pantry_item.seasonings = resp.seasonings
        form.pantry_item.other = resp.other
        this.setState({ form })
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
                                    value={this.state.form.pantry_item.proteins}
                                onChange={this.handleChange.bind(this)}/>

                        <ControlLabel>Vegetables</ControlLabel>
                            <FormControl
                                type='text'
                                name='veggies'
                                value={this.state.form.pantry_item.veggies}
                                onChange={this.handleChange.bind(this)}/>

                        <ControlLabel>Grains</ControlLabel>
                            <FormControl
                                type='text'
                                name='grains'
                                value={this.state.form.pantry_item.grains}
                                onChange={this.handleChange.bind(this)}/>

                        <ControlLabel>Spices</ControlLabel>
                            <FormControl
                                type='text'
                                name='seasonings'
                                value={this.state.form.pantry_item.seasonings}
                                onChange={this.handleChange.bind(this)}/>

                        <ControlLabel>Other</ControlLabel>
                            <FormControl
                                type='text'
                                name='other'
                                value={this.state.form.pantry_item.other}
                                onChange={this.handleChange.bind(this)}/>


                        <Button bsStyle="primary" type='submit' value='submit'>submit</Button>

                </FormGroup>
            </form>
        )
    }
}

export default LandingForm;
