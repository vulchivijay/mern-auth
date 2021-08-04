import React from 'react';
import { isAuth } from './auth/Helpers';
import { Redirect } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Header from './Header';

export default function Landing () {
  if (!isAuth()) {
    return (
      <React.Fragment>
        <Header />
        <div className="container container-landing">
          <h1 className="lp-h1 h1 mb-3">Easily <br/>Manage Your <br/>Daily Tasks.</h1>
          <p className="lp-p">Overwhelmed by your daily tasks? <br/>
          Get them under control with todolist!<br/>
          Get notified!</p>
          <Link to='/signup' className="btn btn-primary">Sign up</Link>
        </div>
      </React.Fragment>
    );
  } else {
    return (<Redirect to="/dashboard" />)
  }
}