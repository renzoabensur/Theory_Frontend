import React, { useState, Component  } from 'react';
import * as ROUTES from '../constants/routes';
import axios from 'axios';
import SignOutButton from './SignHandler/SignOut';
import SignInPage from './SignHandler/SignIn/SignIn'


const NavigationAuth = () => (
  <div className="topnav" id="myTopnav">
    <a className="active" href="/">Theory</a>
    <div className="search-container">
      <form className="form">
        <input type="text" placeholder="Search..." name="search" className="search" style={{ paddingLeft: "40px" }} />
      </form>
    </div>
    <SignOutButton />
    <a href={ROUTES.ACCOUNT} className="second nav-ref" style={{ backgroundColor: "#333" }}>Account</a>
    <a href="true" className="icon" onClick={(e) => {
      e.preventDefault();
      var x = document.getElementById("myTopnav");
      if (x.className === "topnav") {
        x.className += " responsive";
      } else {
        x.className = "topnav";
      }
    }}>
      <i className="fa fa-bars"></i>
    </a>
  </div>
);

class NavigationNonAuth extends Component {
  constructor(props) {
    super(props);

    this.state = {
      show: false
    };
  }

  handleClose = () => {
    this.setState({ show: false })
  }

  showModal = () => {
    this.setState({ show: true })
  }

  render() {
    return (
      <div className="topnav" id="myTopnav">
        <a href="/" className="active">Theory</a>
        <div className="search-container">
          <form className="form">
            <input type="text" placeholder="Search..." name="search" className="search" style={{ paddingLeft: "40px" }} />
          </form>
        </div>
        <button onClick={this.showModal} className='second nav-ref' style={{ backgroundColor: "#333", }}>Log In</button>
        <a href="true" className="icon" onClick={(e) => {
          e.preventDefault();
          var x = document.getElementById("myTopnav");
          if (x.className === "topnav") {
            x.className += " responsive";
          } else {
            x.className = "topnav";
          }
        }}>
          <i className="fa fa-bars"></i>
        </a>
        <SignInPage show={this.state.show} handleClose={this.handleClose} />
      </div>
    )
  }
}

function Navigation() {
  const [data, setData] = useState(null);
  axios.get('http://localhost:5000/user/status').then((res) => {
    setData(res.data);
    console.log(res.data);
  });
  return data === "logout" ? <NavigationNonAuth /> : <NavigationAuth />;
}

export default Navigation;