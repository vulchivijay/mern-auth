import React from 'react';
import { isAuth, signout } from './auth/Helpers';
import { Link, withRouter } from 'react-router-dom';

function Header (match) {
  const username = JSON.parse(localStorage.getItem('user'));

  return (
    <header className="p-3 text-white mb-3 border-bottom">
      {!isAuth() && (
        <div className="container">
          <div className="logo d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
            <Link to='/' className="h2 d-flex align-items-center mb-2 mb-lg-0 text-dark text-decoration-none">
              <i className="bi bi-check2-all"></i>
              <span>tasks</span>
            </Link>
            <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0"></ul>
            <div className="col-md-4 text-end">
              <Link to='/signup' className="btn btn-primary me-2">Sign up</Link>
              <Link to='/signin' className="btn btn-outline-primary me-2">Sign in</Link>
            </div>
          </div>
        </div>
      )}
      {isAuth() && (
        <div className="container-fluid">
          <div className="logo d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
            <Link to='/dashboard' className="h2 d-flex align-items-center mb-2 mb-lg-0 text-dark text-decoration-none me-2">
              <i className="bi bi-check2-all"></i>
              <span>tasks</span>
            </Link>
            <div className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
              {/* <Link to='/dashboard' className="nav-link px-2 link-dark">Dashboard</Link> */}
              {/* <Link to='/about' className="nav-link px-2 link-dark">About</Link>
              <Link to='/contact' className="nav-link px-2 link-dark">Contact</Link>
              {
                isAuth().role === 'admin' ? <Link to='/profile' className="nav-link px-2 link-dark">Profile</Link> : null
              } */}
            </div>
            <div className="col-md-4 text-end">
              <span className="text-dark me-4">Sign in as <b>{ username.name }</b></span>
              <Link to='/' className="btn btn-primary" onClick={() => {
                signout()
              }}>Sign out</Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

export default withRouter(Header);
