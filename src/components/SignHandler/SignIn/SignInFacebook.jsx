import React, { Component } from 'react';
import { doCreateUserWithFacebook } from "../../Firebase/auth"
import axios from 'axios';

const SignInFacebook = () => (
  <div>
    <SignInFacebookButton />
  </div>
);

class SignInFacebookButton extends Component {
  onClick = event => {
    doCreateUserWithFacebook().then((result) => {
      axios.post('http://localhost:5000/user/login').then(res => console.log(res.data));
      window.location = '/';
    }).catch((error) => {
      console.log(error);
    });
    event.preventDefault();
  }

  render() {
    return (
      <div>
        <button onClick={this.onClick} className="facebook">
          <img src={"./images/facebook.png"} style={{ width: "25px", marginRight: "8px" }} alt="facebook"/> Sign In with Facebook
      </button>
      </div>
    )
  }
}


export default SignInFacebook;

export { SignInFacebookButton };