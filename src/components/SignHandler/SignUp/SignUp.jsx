import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { doCreateUserWithEmailAndPassword } from '../../Firebase/auth';
import axios from 'axios';

const INITIAL_STATE = {
    username: '',
    email: '',
    passwordOne: '',
    passwordTwo: '',
    error: null,
  };
  
class SignUpForm extends Component {

  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }
 
  onSubmit = event => {
    const { username, email, passwordOne } = this.state;
    
    doCreateUserWithEmailAndPassword(username,email, passwordOne)
    .then(() => {
      axios.post('https://fan-theory.herokuapp.com/user/login').then(res => console.log(res.data));
      window.location = '/';
    })
 
    event.preventDefault();
  }
 
  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
 
  render() {
    const {
      username,
      email,
      passwordOne,
      passwordTwo
    } = this.state;

    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === '' ||
      email === '' ||
      username === '';

    return (
      <form onSubmit={this.onSubmit}>
          <p className="p-login">Criar conta</p>
          <hr className="hr1" />
          <p className="p-login">Nome:</p>
        <input
          className="input-login"
          name="username"
          value={username}
          onChange={this.onChange}
          type="text"
          placeholder="Full Name"
        />
        <p className="p-login">E-mail:</p>
        <input
          className="input-login"
          name="email"
          value={email}
          onChange={this.onChange}
          type="text"
          placeholder="Email Address"
        />
        <p className="p-login">Senha:</p>
        <input
          className="input-login"
          name="passwordOne"
          value={passwordOne}
          onChange={this.onChange}
          type="password"
          placeholder="Password"
        />
        <p className="p-login">Confirmar senha:</p>
        <input
          className="input-login"
          name="passwordTwo"
          value={passwordTwo}
          onChange={this.onChange}
          type="password"
          placeholder="Confirm Password"
        />
        <div>
          <button className="signup" disabled={isInvalid} type="submit">Sign Up</button>
        </div>
      </form>
    );
  }
}
 
const SignUpLink = () => (
  <p>
    Don't have an account? <Link to="/signUp">Sign Up</Link>
  </p>
);

 
export default SignUpForm;
 
export { SignUpLink };