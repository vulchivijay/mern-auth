import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { isAuth } from './components/auth/Helpers';

import Landing from './components/Landing';
import Signup from './components/Signup';
import Activate from './components/auth/Activate';
import Signin from './components/Signin';

import Home from './components/admin/Home';
import About from './components/admin/About';
import Contact from './components/admin/Contact';
import PageNotFound from './components/layouts/404';

const App = () => {
  return (
    <Switch>
      <Route exact path="/" component={Landing} />
      <Route exact path="/signup" component={Signup} />
      <Route exact path="/auth/activate/:token" component={Activate} />
      <Route exact path="/signin" component={Signin} />
      {!isAuth() && (
        <PageNotFound />
      )}
      {isAuth() && (
        <React.Fragment>
          <Route exact path="/home" component={Home} />
          <Route exact path="/about" component={About} />
          <Route exact path="/contact" component={Contact} />
        </React.Fragment>
      )}
    </Switch>
  );
}

export default App;
