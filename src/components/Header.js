import React from 'react';
import { Link, withRouter } from 'react-router-dom';

function Header (match) {
  const isActive = path => {
    if (match.match.path === path){
      return { color: '#39d000' }
    } else {
      return { color: '#000000'}
    }
  }

  return (
    <header>
      <nav className="navbar navbar-light bg-light">
        <div className="container-fluid">
          <Link to='/' className="navbar-brand mb-0 h1">Logo</Link>
          <div className="d-flex">
            <Link to='/signup' className="nav-link" style={ isActive('/signup') }>Signup</Link>
            <Link to='/signin' className="nav-link" style={ isActive('/signin') }>Signin</Link>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default withRouter(Header);