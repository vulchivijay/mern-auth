import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Landing from './components/Landing';
import Signup from './components/Signup';
import Activate from './components/auth/Activate';
import Signin from './components/Signin';

import Dashboard from './components/admin/Dashboard';
import DashboardAdmin from './components/admin/DashboardAdmin';
import NewTask from './components/admin/NewTask';
import AllTasks from './components/admin/Alltasks';
import Settings from './components/admin/Settings';
import Users from './components/admin/Users';

import PrivateRoute from './components/auth/PrivateRoute';
import UsersRoute from './components/auth/UsersRoute';

import './styles/common.css';

const App = () => {
  return (
    <Switch>
      <Route exact path="/" component={Landing} />
      <Route exact path="/signup" component={Signup} />
      <Route exact path="/auth/activate/:token" component={Activate} />
      <Route exact path="/signin" component={Signin} />
      <PrivateRoute exact path="/dashboard" component={Dashboard} />
      <PrivateRoute exact path="/dashboardadmin" component={DashboardAdmin} />
      <PrivateRoute exact path="/newtask" component={NewTask} />
      <PrivateRoute exact path="/alltasks" component={AllTasks} />
      <PrivateRoute exact path="/settings" component={Settings} />
      <UsersRoute exact path="/users" component={Users} />
    </Switch>
  );
}

export default App;
