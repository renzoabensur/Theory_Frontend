import React, { Component } from 'react';

import { auth } from "./Firebase/firebase"
import PasswordChangeForm from './SignHandler/PasswordChange';

class AccountPage extends Component {
  constructor() {
    super();
    this.state = {
      userEmail: "",
      userName: ""
    };
  }
  componentDidMount() {
    auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          userEmail: user.email,
          userName: user.displayName
        });
      }
    })
  }

  render() {
    return (
      <div className="container card account">
        <div className="">
          <h1>Account </h1>
            <h2>Email:  {this.state.userEmail} </h2>
            <h2>User Name:  {this.state.userName} </h2>
          <PasswordChangeForm />
        </div>
      </div>
    );
  }
}

export default AccountPage;