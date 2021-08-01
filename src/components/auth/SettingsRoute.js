import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isAuth } from './Helpers';

const SettingsRoute = ({component: Component, ...rest}) => {
  return <Route {...rest} render={
    props => isAuth() && isAuth().role === 'admin' ? (<Component {...props} />) : (<Redirect to={{
      pathname: '/dashboard', state: {from:props.location}
    }} />)
  } />
}

export default SettingsRoute;
