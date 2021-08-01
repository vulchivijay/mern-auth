import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import { authenticate, isAuth } from './auth/Helpers';
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.min.css';

import Header from './Header';

export default function Signin ({ history }) {

  const [values, setValues] = useState({
    email: "",
    password: "",
    buttonText: "Sign in"
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
      authenticate(response, () => {
        setValues({...values, email: '', password: '', buttonText: 'Sign in'})
        toast.success(`Hey ${response.data.user.name}, Welcome back!`);
        isAuth() && isAuth().role === 'admin' ? history.push('/admin') : history.push('/dashboard'); 
      });
    })
    .catch(error => {
      // console.log('Sign in error ', error.response.data);
      setValues({...values, buttonText: 'Sign in'})
      toast.error(error.response.data.error);
    })
  }

  return (
    <React.Fragment>
      {/* { JSON.stringify(isAuth())} */}
      <ToastContainer />
      <Header />
      <div className="form-signin text-center">
        <form onSubmit={handleSubmit}>
          <h1 className="h3 mb-3 fw-normal">Please sign in</h1>
          <div className="form-floating">
            <input className="form-control" type="email" placeholder="email" onChange={handleChange('email')} value={email} />
            <label>Email address</label>
          </div>
          <div className="form-floating">
            <input className="form-control" type="password" placeholder="password" onChange={handleChange('password')} value={password} />
            <label>Password</label>
          </div>
          <button className="w-100 btn btn-lg btn-primary" type="submit">{buttonText}</button>
          <p className="mt-5 mb-3 text-muted">&copy; 2021</p>
        </form>
      </div>
    </React.Fragment>
  )
}