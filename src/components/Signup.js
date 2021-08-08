import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import { isAuth } from './auth/Helpers';
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.min.css';

import Header from './Header';

export default function Signup () {

  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    buttonText: "Submit"
  })

  const {name, email, password, buttonText} = values;

  const handleChange = (name) => (event) => {
    setValues({...values, [name]: event.target.value });
  }
  
  const handleSubmit = (event) => {
    event.preventDefault();
    setValues({...values, buttonText: 'Submitting...'});
    axios({
      method: 'POST',
      url: `${process.env.REACT_APP_API}/signup`,
      data: { name, email, password }
    })
    .then(response => {
      // console.log('Sign up success', response);
      setValues({...values, name:'', email: '', password: '', buttonText: 'Submit'})
      toast.success(response.data.message);
    })
    .catch(error => {
      // console.log('Sign up error ', error.response.data);
      setValues({...values, buttonText: 'Submit'})
      toast.error(error.response.data.error);
    })
  }

  return (
    <React.Fragment>
      <ToastContainer />
      <Header />
      { isAuth() ? <Redirect to='/' /> : null }
      <div className="form-signin text-center">
        <form onSubmit={handleSubmit}>
          <h1 className="h3 mb-3 fw-normal">Please sign up</h1>
          <div className="form-floating mb-3">
            <input className="form-control" type="text" placeholder="Name" onChange={handleChange('name')} value={name} />
            <label>User name</label>
          </div>
          <div className="form-floating  mb-3">
            <input className="form-control br-0" type="email" placeholder="email" onChange={handleChange('email')} value={email} />
            <label>Email address</label>
          </div>
          <div className="form-floating  mb-3">
            <input className="form-control" type="password" placeholder="password" onChange={handleChange('password')} value={password} />  
            <label>Password</label>
          </div>
          <button className="w-100 btn btn-lg btn-primary" type="submit">{buttonText}</button>
        </form>
      </div>
    </React.Fragment>
  )
}