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
      <div className="container">
        <div className="justify-content-md-center">
          <div className="col col-lg-4 mx-auto card">
            <h1>Signin</h1>
            <form onSubmit={() => {handleSubmit()}}>
              <div>
                <input className="form-control" type="email" placeholder="email" name="email" onChange={() => handleChange('email')} />
              </div>
              <div>
                <input className="form-control" type="password" placeholder="password" name="password" onChange={() => handleChange('password')} />
              </div>
              <div>
                <button className="btn btn-primary">Signin</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}