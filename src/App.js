import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { isAuth } from './components/auth/Helpers';

import Landing from './components/Landing';
import Signup from './components/Signup';
import Activate from './components/auth/Activate';
import Signin from './components/Signin';

import Dashboard from './components/admin/Dashboard';
import About from './components/admin/About';
import Contact from './components/admin/Contact';
import Admin from './components/admin/Admin';

import PrivateRoute from './components/auth/PrivateRoute';
import AdminRoute from './components/auth/AdminRoute';

import './styles/common.css';

const App = () => {
  console.log("Test", isAuth())
  return (
    <Switch>
      <Route exact path="/" component={Landing} />
      <Route exact path="/signup" component={Signup} />
      <Route exact path="/auth/activate/:token" component={Activate} />
      <Route exact path="/signin" component={Signin} />
      <PrivateRoute exact path="/dashboard" component={Dashboard} />
      <PrivateRoute exact path="/about" component={About} />
      <PrivateRoute exact path="/contact" component={Contact} />
      <AdminRoute exact path="/admin" component={Admin} />
    </Switch>
  );
}

export default App;
