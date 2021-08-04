import React from 'react';
import { isAuth } from '../auth/Helpers';
import { Link } from 'react-router-dom';

export default function AsideBar () {
  return (
    <aside className="aside-primary">
      {
        isAuth().role === 'admin' ? <Link to='/settings' className="nav-link px-2 link-dark">Admin dashboard</Link> : <Link to='/dashboard' className="nav-link px-2 link-dark">Dashboard</Link>
      }
      {
        isAuth().role === 'admin' ? null : <Link to='/about' className="nav-link px-2 link-dark">New task</Link>
      }
      {
        isAuth().role === 'admin' ? null : <Link to='/contact' className="nav-link px-2 link-dark">View tasks</Link>
      }
      {
        isAuth().role === 'admin' ? null : <Link to='/settings' className="nav-link px-2 link-dark">Settings - user updates</Link>
      }
      {
        isAuth().role === 'admin' ? <Link to='/settings' className="nav-link px-2 link-dark">Users</Link> : null
      }
    </aside>
  )
}