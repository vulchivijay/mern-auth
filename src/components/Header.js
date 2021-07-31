import React from 'react';
import {Link} from 'react-router-dom';

export default function Header () {
  return (
    <header className="flex items-center justify-between flex-wrap p-4">
      <nav>
        <Link to='/' className="">Logo</Link>
      </nav>
      <nav>
        <Link to='/signup' className="">Signup</Link>
        <Link to='/signin' className="">Signin</Link>
      </nav>
    </header>
  );
}