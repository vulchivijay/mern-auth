import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

import Header from './Header';

export default function Signin () {

  const [values, setValues] = useState({
    email: "",
    password: "",
    buttonText: "Signin"
  })

  const {email, password, buttonText} = values;

  const handleChange = (name) => (event) => {
    setValues({...values, [name]: event.target.value });
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    setValues({...values, buttonText: 'Signing...'});
    axios({
      method: 'POST',
      url: `${process.env.REACT_APP_API}/signin`,
      data: { email, password }
    })
    .then(response => {
      // console.log('Sign in success', response);

      // save the response (user, token) localstorage/cookies
      setValues({...values, email: '', password: '', buttonText: 'Signin'})
      toast.success(`Hey ${response.data.user.name}, Welcome back!`);
    })
    .catch(error => {
      console.log('Sign in error ', error.response.data);
      setValues({...values, buttonText: 'Signin'})
      toast.error(error.response.data.error);
    })
  }

  return (
    <React.Fragment>
      <ToastContainer />
      <Header />
      <div className="container">
        <div className="justify-content-md-center">
          <div className="col col-lg-4 mx-auto card p-15">
            <h1>Signin</h1>
            <form onSubmit={handleSubmit}>
              <div>
                <input className="form-control" type="email" placeholder="email" onChange={handleChange('email')} value={email} />
              </div>
              <div>
                <input className="form-control" type="password" placeholder="password" onChange={handleChange('password')} value={password} />
              </div>
              <div>
                <button className="btn btn-primary">{buttonText}</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}