import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

import Header from './../Header';

export default function Activate ({match}) {

  const [values, setValues] = useState({
    name: "",
    token: "",
    show: true
  })

  const {name, token, show} = values;

  useEffect(() => {
    let token = match.params.token;
    let name = jwt.decode(token);
    if (token) {
      setValues({...values, name: name.name, token});
    }
    // console.log('hey', token, name.name);
  }, []);

  const activationLink = (event) => (
    <div className="">
      <h1>Hey {name}, Ready to activate your account</h1>
      <button className="btn btn-primary" onClick={handleSumbit}>Activate Account</button>
    </div>
  )

  const handleSumbit = (event) => {
    event.preventDefault();
    // setValues({...values, buttonText: 'Activating...'});
    axios({
      method: 'POST',
      url: `${process.env.REACT_APP_API}/account-activation`,
      data: { token }
    })
    .then(response => {
      // console.log('Account activation success', response);
      setValues({...values, show: false })
      toast.success(response.data.message);
    })
    .catch(error => {
      // console.log('Account activation error ', error.response.data.error);
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
            <h1>Activate account</h1>
            {activationLink()}
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}