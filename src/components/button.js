import React, { Component } from 'react'
import { Image, Button } from 'react-bootstrap'





class ButtonFunction extends Component {
    constructor(props){
        super(props);
        this.state = {
        }
    }
render(){
    return(
        <div>
        <Button id={this.props.id} bsStyle={this.props.style} onClick={this.props.onClick}>{this.props.text}</Button>
        </div>
    )
}}







export default ButtonFunction
