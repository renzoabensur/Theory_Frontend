import React, { Component} from 'react';
import axios from 'axios';
 
import { doSignOut } from '../Firebase/auth';

class SignOutButton extends Component {
  onClick = event => {
    doSignOut()
    axios.post('http://localhost:5000/user/logout').then(res => console.log(res.data));
    event.preventDefault();
    window.location = '/';
  }

  render() {
    return (
      <a href="true" onClick={this.onClick}  className="first nav-ref" style={{ backgroundColor: "#4CAF50" }}>
      Sign Out
    </a>
    )
  }
}

export default SignOutButton;