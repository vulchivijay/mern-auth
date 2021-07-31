import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

import Header from './Header';

export default function Signin () {

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
      <h1>Signin</h1>
      <form onSubmit={() => {handleSubmit()}}>
        <div>
          <input type="email" placeholder="email" name="email" onChange={() => handleChange('email')} />
        </div>
        <div>
          <input type="password" placeholder="password" name="password" onChange={() => handleChange('password')} />
        </div>
        <div>
          <button>Signin</button>
        </div>
      </form>
    </React.Fragment>
  )
}