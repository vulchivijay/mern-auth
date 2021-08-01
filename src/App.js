import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Landing from './components/Landing';
import Signup from './components/Signup';
import Activate from './components/auth/Activate';
import Signin from './components/Signin';

import Home from './components/admin/Home';
import About from './components/admin/About';
import Contact from './components/admin/Contact';

import PrivateRoute from './components/auth/PrivateRoutes';

import './styles/common.css';

const App = () => {
  return (
    <Switch>
      <Route exact path="/" component={Landing} />
      <Route exact path="/signup" component={Signup} />
      <Route exact path="/auth/activate/:token" component={Activate} />
      <Route exact path="/signin" component={Signin} />
      <PrivateRoute exact path="/home" component={Home} />
      <PrivateRoute exact path="/about" component={About} />
      <PrivateRoute exact path="/contact" component={Contact} />
    </Switch>
  );
}

export default App;
