import React, { Component } from 'react';
import * as ROUTES from '../../../constants/routes';
import { doSignInWithEmailAndPassword } from "../../Firebase/auth";
import { Modal } from 'react-bootstrap'

import SignInFacebookButton from '../SignIn/SignInFacebook';
import SignInGoogleButton from './SignInGoogle';
import PasswordForgetForm from "../PasswordForget"
import SignUpForm from '../SignUp/SignUp'
import axios from 'axios';

class SignInPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      showSignup: false,
      showPassword: false
    };
  }

  onSubmit = event => {
    const { email, password } = this.state;

    doSignInWithEmailAndPassword(email, password)
      .then(() => {
        axios.post('http://localhost:5000/user/login').then(res => console.log(res.data));
        this.setState({
          email: '',
          password: '',
          showSignup: false,
          showPassword: false,
          show:false
        });
        this.props.history.push("/");
      })
      .catch(error => {
        this.setState({ error });
      });

    event.preventDefault();
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleClose = () => {
    this.setState({
      showSignup: false,
      showPassword: false,
      show: false,
    })

  }


  showSignup = () => {
    this.setState({ showSignup: true })
  }

  showPassword = () => {
    this.setState({ showPassword: true })
  }

  render() {
    const { email, password } = this.state;
    const isInvalid = password === '' || email === '';

    return (
      <div>
        <Modal size="lg" show={this.props.show} onHide={this.props.handleClose}>
          <Modal.Header closeButton>
            <h2 className="login-title">Theory</h2>
          </Modal.Header>
          <Modal.Body >
            <div className="container-fluid">
              <div className="row">
                <div className="col-6">
                  {this.state.showSignup ? <SignUpForm /> :
                    <div className="google-facebook">
                      <SignInGoogleButton />
                      <SignInFacebookButton />
                      <button onClick={this.showSignup} className="signup-button">Crie uma conta com o seu e-mail</button>
                    </div>
                  }
                </div>
                <div className="col-6 vertical-line">
                  {this.state.showPassword ? <PasswordForgetForm /> :
                    <form onSubmit={this.onSubmit}>
                      <div>
                        <p className="p-login">Fazer login</p>
                        <hr className="hr1" />
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
                          name="password"
                          value={password}
                          onChange={this.onChange}
                          type="password"
                          placeholder="Password"
                        />
                      </div>
                      <div className="row">
                        <button className="senha-button" onClick={this.showPassword}>Esqueceu a senha?</button>
                        <button className="signin-button" disabled={isInvalid} type="submit">Sign In</button>
                      </div>
                    </form>

                  }
                </div>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}


export default SignInPage;
