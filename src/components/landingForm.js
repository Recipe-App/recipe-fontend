import React, {Component} from 'react'
import { ControlLabel, Button, FormControl, FormGroup, } from 'react-bootstrap'

class LandingForm extends Component{
    constructor(props){
        super(props)
        this.state = {
            form: {
                pantry_items: {
                    meat: "",
                    vegetables: "",
                    grains: "",
                    spices: "",
                    other: ""
                }
            }
        }
    }
    handleChange(event){
        console.log(event)
        let { form } = this.state
        form.pantry_items[event.target.name]= event.target.value
        this.setState({form: form})

    }
    handleSumbit(event){
        event.preventDefault()
        let {form} = this.state

}
    render() {
        return(
                <form onSubmit={this.handleChange.bind(this)}>
                    <FormGroup>
                        <ControlLabel>Protein</ControlLabel>
                            <FormControl
                                type='text'
                                name='Protein'
                                value={this.state.value}
                                placeholder="Enter Protein"
                                onChange={this.handleChange.bind(this)}/>

                        <ControlLabel>vegetables</ControlLabel>
                            <FormControl
                                type='text'
                                name='vegetables'
                                value={this.state.value}
                                placeholder="Enter Vegetable"
                                onChange={this.handleChange.bind(this)}/>

                        <ControlLabel>grains</ControlLabel>
                            <FormControl
                                type='text'
                                name='grains'
                                value={this.state.value}
                                placeholder="Enter Grains"
                                onChange={this.handleChange.bind(this)}/>

                        <ControlLabel>spices</ControlLabel>
                            <FormControl
                                type='text'
                                name='spices'
                                value={this.state.value}
                                placeholder="Enter Spices"
                                onChange={this.handleChange.bind(this)}/>

                        <ControlLabel>other</ControlLabel>
                            <FormControl
                                type='text'
                                name='other'
                                value={this.state.value}
                                placeholder="Enter Other"
                                onChange={this.handleChange.bind(this)}/>

                        <Button bsStyle="primary" type='submit' value='submit'>submit</Button>

                </FormGroup>
            </form>
        )
    }
}

    export default LandingForm;
