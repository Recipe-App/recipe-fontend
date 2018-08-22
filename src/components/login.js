import React, { Component } from 'react'
import { ControlLabel, Button, FormControl, FormGroup } from 'react-bootstrap'

function LoginForm(props) {
         return (
            <form onSubmit={props.onSubmit}>
            <h1>Welcome to the Login Page!</h1>
                <FormGroup>

                    <ControlLabel>Email</ControlLabel>
                    <FormControl
                        type='text'
                        name='email'
                        placeholder="Email"
                        onChange={props.onChange}/><br/>

                    <ControlLabel>Password</ControlLabel>
                    <FormControl
                        type='password'
                        name='password'
                        placeholder="Password"
                        onChange={props.onChange}/><br/>

                    <Button bsStyle="danger" type='submit' value='submit'>Login</Button>
                    </FormGroup>
                </form>

        )
    }

export default LoginForm
