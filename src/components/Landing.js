import React from 'react';
import { isAuth } from './auth/Helpers';
import { Redirect } from 'react-router-dom';
import Header from './Header';

export default function Landing () {
  if (!isAuth()) {
    return (
      <React.Fragment>
        <Header />
        <div className="container">
          <h1 className="h1 mb-3 fw-normal">Landing page</h1>
        </div>
      </React.Fragment>
    );
  } else {
    return (<Redirect to="/dashboard" />)
  }
}