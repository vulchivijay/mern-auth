import React from 'react';
import { isAuth } from '../auth/Helpers';
import { Link } from 'react-router-dom';

export default function AsideBar () {
  return (
    <aside className="aside-primary">
      {
        isAuth().role === 'admin' ? <Link to='/dashboardadmin' className="nav-link px-2 link-dark">Dashboard admin</Link> : <Link to='/dashboard' className="nav-link px-2 link-dark">Dashboard</Link>
      }
      {
        isAuth().role === 'admin' ? null : <Link to='/newtask' className="nav-link px-2 link-dark">New task</Link>
      }
      {
        isAuth().role === 'admin' ? null : <Link to='/alltasks' className="nav-link px-2 link-dark">View tasks</Link>
      }
      {
        isAuth().role === 'admin' ? null : <Link to='/settings' className="nav-link px-2 link-dark">Settings</Link>
      }
      {
        isAuth().role === 'admin' ? <Link to='/users' className="nav-link px-2 link-dark">Users</Link> : null
      }
    </aside>
  )
}