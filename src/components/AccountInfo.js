import React, { Component } from 'react';
import { getProfile } from '../api/index'
import { ControlLabel, Button, FormControl, FormGroup } from 'react-bootstrap'


class AccountInfo extends Component {
  constructor(props){
    super(props);
    this.state = {
      user: ""
    }
  }

  componentWillMount(){
    getProfile()
      .then( res => {this.setState({ user: res })
    })

  }


  handleChange(event){
      let { form } = this.state
      form.user[event.target.name] = event.target.value
      this.setState({form: form})
  }
  render() {
    console.log("Profile",this.state.user);
    return (
        <div className="move"><img src="http://agromarketday.com/images/profile-holder.png"
        alt="img" class="responsive"/>

<div class="infocontainer">

      <FormGroup className="ProfileInfo">

      <ul>
              <FormControl
                  type='text'
                  name='first_name'
                  value={this.state.value}
                  placeholder={this.state.user.first_name}
                  onChange={this.handleChange.bind(this)}/>


                  <FormControl
                      type='text'
                      name='last_name'
                      value={this.state.value}
                      placeholder={this.state.user.last_name}
                      onChange={this.handleChange.bind(this)}/>


                  <FormControl
                      type='text'
                      name='email'
                      value={this.state.value}
                      placeholder={this.state.user.email}
                      onChange={this.handleChange.bind(this)}/>


                  <FormControl
                      type='text'
                      name='phone'
                      value={this.state.value}
                      placeholder={this.state.user.phone}
                      onChange={this.handleChange.bind(this)}/>



                  <FormControl
                      type='text'
                      name='city'
                      value={this.state.value}
                      placeholder={this.state.user.city}
                      onChange={this.handleChange.bind(this)}/>


                  <FormControl
                      type='text'
                      name='state'
                      value={this.state.value}
                      placeholder={this.state.user.state}
                      onChange={this.handleChange.bind(this)}/>


                  <FormControl
                      type='text'
                      name='zip'
                      value={this.state.value}
                      placeholder={this.state.user.zip}
                      onChange={this.handleChange.bind(this)}/>


                  <FormControl
                      type='password'
                      name='password'
                      value={this.state.value}
                      placeholder={this.state.user.password}
                      onChange={this.handleChange.bind(this)}/>



                  <Button bsStyle="primary" type='submit' value='submit'>Save</Button>

                  </ul>
          </FormGroup>




</div>







     </div>
    );
  }
}

export default AccountInfo;

// </div>
