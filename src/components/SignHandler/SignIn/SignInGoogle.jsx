import React, { Component } from 'react';
import { doCreateUserWithGoogle } from "../../Firebase/auth"
import axios from 'axios';

const SignInGoogle = () => (
  <div>
    <SignInGoogleButton />
  </div>
);

class SignInGoogleButton extends Component {
  onClick = event => {
    doCreateUserWithGoogle().then(() => {
      axios.post('https://fan-theory.herokuapp.com/user/login').then(res => console.log(res.data));
      window.location = '/';
    }).catch((error) => {
      console.log(error);
    });
  }

  render() {
    return (
    <div>
      <button onClick={this.onClick} className="google">
        <img src={"./images/google.png"} style={{ width: "25px", marginRight:"8px" }} alt="google"/> Sign In with Google
      </button>
    </div>
    )
  }
}

export default SignInGoogle;

export { SignInGoogleButton };