import React from 'react';
import { isAuth, signout } from './auth/Helpers';
import { Link, withRouter } from 'react-router-dom';

function Header (match) {
  const isActive = path => {
    if (match.match.path === path){
      return { color: '#39d000' }
    } else {
      return { color: '#000000'}
    }
  }
  const username = JSON.parse(localStorage.getItem('user'));

  return (
    <header>
      <nav className="navbar navbar-light bg-light">
          {!isAuth() && (
            <div className="container-fluid">
              <Link to='/' className="navbar-brand mb-0 h1">Logo</Link>
              <div className="d-flex">
                <Link to='/signup' className="nav-link" style={ isActive('/signup') }>Signup</Link>
                <Link to='/signin' className="nav-link" style={ isActive('/signin') }>Signin</Link>
              </div>
            </div>
          )}
          {isAuth() && (
            <div className="container-fluid">
              <Link to='/home' className="navbar-brand mb-0 h1">Logo</Link>
              <div className="d-flex">
                <Link to='/home' className="nav-link" style={ isActive('/home') }>Home</Link>
                <Link to='/about' className="nav-link" style={ isActive('/about') }>About</Link>
                <Link to='/contact' className="nav-link" style={ isActive('/contact') }>Contact</Link>
                <span className="nav-link">Sign in as <b>{ username.name }</b></span>
                <Link to='/' className="nav-link" onClick={() => {
                  signout()
                }}>Sign out</Link>
              </div>
            </div>
          )}
      </nav>
    </header>
  );
}

export default withRouter(Header);