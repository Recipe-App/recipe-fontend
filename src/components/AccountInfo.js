import React, { Component, FormGroup } from 'react';
import { getProfile } from '../api/index'
import ProfileImage from '../components/profileimage'




class AccountInfo extends Component {
  constructor(props){
    super(props);
    this.state = {
      user: ""
    }
this.handleChange = this.handleChange.bind(this);
this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount(){
    getProfile()
      .then( res => {this.setState({ user: res })
    })
  }

  handleChange(event){

  }

  handleSubmit(event){
      event.preventDefault()
      let { form } = this.state

      form.user.password_confirmation = form.user.password}




  render() {
    return (

            <div class="flex-container1">
            
            <img class="pic" src="https://i.stack.imgur.com/dr5qp.jpg" alt="john" />
            <ul><h4><b>Update Information:</b></h4>

                <p><input type="text" name="first name" placeholder={this.state.user.first_name} onChange={this.handleChange.bind(this)} /></p>

                <p><input type="text" name="last name" placeholder={this.state.user.last_name} onChange={this.handleChange.bind(this)} /></p>

                <p><input type="text" name="email" placeholder={this.state.user.email}  onChange={this.handleChange.bind(this)} /></p>

                <p><input type="text" name="phone" placeholder={this.state.user.phone} value={this.state.title} onChange={this.handleChange.bind(this)} /></p>

                <p><input type="text" name="city" placeholder={this.state.user.city} value={this.state.title} onChange={this.handleChange.bind(this)} /></p>

                <p><input type="text" name="state" placeholder={this.state.user.state} value={this.state.title} onChange={this.handleChange.bind(this)} /></p>

                <p><input type="text" name="zip" placeholder={this.state.user.zip} value={this.state.title} onChange={this.handleChange.bind(this)} /></p>

                <p><input type="password" name="password" placeholder="Update Password" value={this.state.title} onChange={this.handleChange.bind(this)} /></p>

                <p><input type="password" name="confirm" placeholder="Confirm Password" value={this.state.title} onChange={this.handleChange.bind(this)} /></p>
                <p><button>Save</button></p>

            </ul>
            <div class="footer">
                    <h5>About Us&nbsp;
                    Contact Us</h5>
                    </div>


                    </div>

    );
  }
}

export default AccountInfo;

// <div className="card border-danger mb-3"  style={this.myCardStyle}>
// <div className="card-header">Profile</div>
// <div className="card-body">
// <h4 className="card-title">Primary card title</h4>
// <p className="card-text">
//   <ul >
//       <div>
//           <h1>{this.state.user.first_name}</h1>
//           <h1>{this.state.user.last_name}</h1>
//           <h1>{this.state.user.email}</h1>
//           <h1>{this.state.user.phone}</h1>
//           <h1>{this.state.user.city}</h1>
//           <h1>{this.state.user.state}</h1>
//           <h1>{this.state.user.zip}</h1>
//       </div>
//   </ul>
// </p>
// </div>
// </div>
