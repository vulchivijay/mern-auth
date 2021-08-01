import React from 'react';
import { isAuth, signout } from './auth/Helpers';
import { Link, withRouter } from 'react-router-dom';

function Header (match) {
  // const isActive = path => {
  //   if (match.match.path === path){
  //     return { color: '#00000' }
  //   } else {
  //     return { color: '#ffffff'}
  //   }
  // }
  const username = JSON.parse(localStorage.getItem('user'));

  return (
    <header className="p-3 text-white mb-3 border-bottom">
      <div className="container">
        <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
          {!isAuth() && (
            <React.Fragment>
              <Link to='/' className="d-flex align-items-center mb-2 mb-lg-0 text-dark text-decoration-none">Logo</Link>
              <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0"></ul>
              <div className="col-md-3 text-end">
                <Link to='/signin' className="btn btn-outline-primary me-2">Sign in</Link>
                <Link to='/signup' className="btn btn-primary">Sign up</Link>
              </div>
            </React.Fragment>
          )}
          {isAuth() && (
            <React.Fragment>
              <Link to='/dashboard' className="d-flex align-items-center mb-2 mb-lg-0 text-dark text-decoration-none me-2">Logo</Link>
              <div className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
                <Link to='/dashboard' className="nav-link px-2 link-dark">Dashboard</Link>
                <Link to='/about' className="nav-link px-2 link-dark">About</Link>
                <Link to='/contact' className="nav-link px-2 link-dark">Contact</Link>
                {
                  isAuth().role === 'admin' ? <Link to='/admin' className="nav-link px-2 link-dark">Admin</Link> : null
                }
              </div>
              <div className="col-md-3 text-end">
                <span className="text-dark me-4">Sign in as <b>{ username.name }</b></span>
                <Link to='/' className="btn btn-primary" onClick={() => {
                  signout()
                }}>Sign out</Link>
              </div>
            </React.Fragment>
          )}
        </div>
      </div>
    </header>
  );
}

export default withRouter(Header);
