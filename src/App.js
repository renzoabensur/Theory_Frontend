import React from "react";
import { BrowserRouter as Router, Route, Switch, } from "react-router-dom";

import Navigation from './components/Navigation';
import SignUpPage from './components/SignHandler/SignUp/SignUp';
import SignInPage from './components/SignHandler/SignIn/SignIn';
import PasswordForgetPage from './components/SignHandler/PasswordForget';

import HomePage from './components/Homepage';
import AccountPage from './components/Account';
import AdminPage from './components/Admin';
import NotFoundPage from './components/NotFound';

import Musics from './components/Categories/Musics';
import Movies from './components/Categories/Movies';
import Series from './components/Categories/Series';

import CreatePost from './components/PostHandler/CreatePost';
import EditPost from './components/PostHandler/EditPost';
import PostPage from './components/PostHandler/PostPage';


const App = () => (
  <Router>
    <Navigation />
    <Switch>
      {/* <Route path='/' component={HomePage} /> */}
      <Route path='/signup' component={SignUpPage} />
      <Route path='/signin' component={SignInPage} />

      <Route path='/musics' component={Musics} />
      <Route path='/movies' component={Movies} />
      <Route path='/series' component={Series} />

      <Route path='/submit' component={CreatePost} />
      <Route path='/edit/:id' component={EditPost} />
      <Route path='/postpage/:id' component={PostPage} />

      <Route path='/pw-forget' component={PasswordForgetPage} />
      <Route path='/account' component={AccountPage} />
      <Route path='/admin' component={AdminPage} />
      <Route path='*' component={HomePage} />
    </Switch>
  </Router>
);

export default App;