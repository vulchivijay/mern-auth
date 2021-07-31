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
    buttonText: "Submit"
  })

  const {name, email, password, buttonText} = values;

  const handleChange = (name) => (event) => {
    setValues({...values, [name]: event.target.value });
  }
  console.log()
  const handleSubmit = (event) => {
    event.preventDefault();
    setValues({...values, buttonText: 'Submitting...'});
    axios({
      method: 'POST',
      url: `${process.env.REACT_APP_API}/signup`,
      data: { name, email, password }
    })
    .then(response => {
      console.log('Sign up success', response);
      setValues({...values, name:'', email: '', password: '', buttonText: 'Submit'})
      toast.success(response.data.message);
    })
    .catch(error => {
      console.log('Sign up error ', error.response.data);
      setValues({...values, buttonText: 'Submit'})
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
            <h1>Signup</h1>
            <form onSubmit={handleSubmit}>
              <div>
                <input className="form-control" type="text" placeholder="Name" onChange={handleChange('name')} value={name} />
              </div>
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