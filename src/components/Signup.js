import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

import Header from './Header';

export default function Signup () {

  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    buttonText: ""
  })

  const handleChange = (name) => (event) => {
    //
  }

  const handleSubmit = (event) => {
    //
  }

  return (
    <React.Fragment>
      <Header />
      <h1>Signup</h1>
      <form onSubmit={() => {handleSubmit()}}>
        <div>
          <input type="text" placeholder="Name" name="name" onChange={() => handleChange('name')} />
        </div>
        <div>
          <input type="email" placeholder="email" name="email" onChange={() => handleChange('email')} />
        </div>
        <div>
          <input type="password" placeholder="password" name="password" onChange={() => handleChange('password')} />
        </div>
        <div>
          <button>Signup</button>
        </div>
      </form>
    </React.Fragment>
  )
}