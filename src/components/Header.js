import React from 'react';
import {Link} from 'react-router-dom';

export default function Header () {
  return (
    <header>
      <nav className="navbar navbar-light bg-light">
        <div className="container-fluid">
          <Link to='/' className="navbar-brand mb-0 h1">Logo</Link>
          <div className="d-flex">
            <Link to='/signup' className="nav-link">Signup</Link>
            <Link to='/signin' className="nav-link">Signin</Link>
          </div>
        </div>
      </nav>
    </header>
  );
}