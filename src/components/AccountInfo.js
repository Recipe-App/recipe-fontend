import React, { Component } from 'react';
import { getProfile } from '../api/index'
import ProfileImage from '../components/profileimage'




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






  render() {
    return (
            <div className= "profileForm">


            <div className="profileForm_info">
            <h2 className="profileHeader">
            <ProfileImage  /></h2>

                    {this.state.user.first_name}&nbsp;
                    {this.state.user.last_name}<br/>

                    {this.state.user.email}<br/>
                    {this.state.user.phone}<br/>
                    {this.state.user.city},&nbsp;
                    {this.state.user.state}<br/>
                    {this.state.user.zip}

                    <div class="footer">
                    <h3>About Us&nbsp;
                    Contact Us</h3>
                    </div>

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
