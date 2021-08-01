import React, { useState, useEffect } from 'react';
// import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

import Header from './../Header';

export default function Activate ({match}) {

  const [values, setValues] = useState({
    name: "",
    token: ""
  })

  const {name, token} = values;

  useEffect(() => {
    let token = match.params.token;
    let name = jwt.decode(token);
    if (token) {
      setValues({...values, name: name.name, token});
    }
    // console.log('hey', token, name.name);
  }, []);

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

  const activationLink = (event) => (
    <React.Fragment>
      <h1 className="h1">Hey {name}!, Ready to activate your account? Click below button.</h1>
      <button className="btn btn-primary" onClick={handleSumbit}>Activate Account</button>
    </React.Fragment>
  )

  return (
    <React.Fragment>
      <ToastContainer />
      <Header />
      <div className="container">
        <div className="text-center">
            {activationLink()}
        </div>
      </div>
    </React.Fragment>
  )
}