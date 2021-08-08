import React from 'react';
import { isAuth } from '../auth/Helpers';
import { Link } from 'react-router-dom';

export default function AsideBar ({history}) {
  const isActive = path => {
    if (history.location.pathname === path){
      return { backgroundColor: '#0d6efd', color: '#fff' }
    } else {
      return { backgroundColor: '#fff', color: '#000' }
    }
  }

  return (
    <aside className="aside-primary">
      {
        isAuth().role === 'admin' ? <Link to='/dashboardadmin' className="nav-link px-2 link-dark" style={ isActive('/dashboardadmin') }>Dashboard</Link> : <Link to='/dashboard' className="nav-link px-2 link-dark" style={ isActive('/dashboard') }>Dashboard</Link>
      }
      <Link to='/newtask' className="nav-link px-2 link-dark" style={ isActive('/newtask') }>New task</Link>
      <Link to='/alltasks' className="nav-link px-2 link-dark" style={ isActive('/alltasks') }>All tasks</Link>
      <Link to='/profile' className="nav-link px-2 link-dark" style={ isActive('/profile') }>Profile</Link>
      {
        isAuth().role === 'admin' ? <Link to='/users' className="nav-link px-2 link-dark" style={ isActive('/users') }>Users</Link> : null
      }
    </aside>
  )
}