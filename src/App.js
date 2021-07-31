import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './components/Home';
import Signup from './components/Signup';
import Activate from './components/auth/Activate';
import Signin from './components/Signin';

const App = () => {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/signup" component={Signup} />
      <Route exact path="/auth/activate/:token" component={Activate} />
      <Route exact path="/signin" component={Signin} />
    </Switch>
    // <Layout>
    //   Landing page
    // </Layout>
  );
}

export default App;
