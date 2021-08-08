import React from 'react';
import { isAuth } from '../auth/Helpers';
import { Link } from 'react-router-dom';

export default function AsideBar () {
  return (
    <aside className="aside-primary">
      {
        isAuth().role === 'admin' ? <Link to='/dashboardadmin' className="nav-link px-2 link-dark">Dashboard admin</Link> : <Link to='/dashboard' className="nav-link px-2 link-dark">Dashboard</Link>
      }
      <Link to='/newtask' className="nav-link px-2 link-dark">New task</Link>
      <Link to='/alltasks' className="nav-link px-2 link-dark">View tasks</Link>
      <Link to='/profile' className="nav-link px-2 link-dark">Profile</Link>
      {
        isAuth().role === 'admin' ? <Link to='/users' className="nav-link px-2 link-dark">Users</Link> : null
      }
    </aside>
  )
}