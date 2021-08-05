import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import { isAuth, getCookie, signout } from '../auth/Helpers';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

import Header from '../Header';
import AsideBar from './Aside';

const Settings = ({history}) => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
    buttonText: "Update"
  })
  const token = getCookie('token');
  const {name, email, password, role, buttonText} = values;

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = () => {
    axios({
      method: 'GET',
      url: `${process.env.REACT_APP_API}/user/${isAuth()._id}`,
      headers : {
        Authorization: `Bearer ${token}`
      }
    })
    .then(response => {
      // console.log(response.data);
      const { name, email, role} = response.data;
      setValues({...values, name, email, role});
    })
    .catch(error => {
      // console.log("profile update error ", error);
      if(error.response.status === 401) {
        signout(() => {
          history.push('/signin');
        })
      }
    })
  }

  const handleChange = (name) => (event) => {
    setValues({...values, [name]: event.target.value });
  }
  
  const handleUpdate = (event) => {
    event.preventDefault();
    setValues({...values, buttonText: 'Updating...'});
    axios({
      method: 'POST',
      url: `${process.env.REACT_APP_API}/`,
      data: { name, email, password }
    })
    .then(response => {
      // console.log('Sign up success', response);
      setValues({...values, name:'', email: '', password: '', buttonText: 'Update'})
      toast.success(response.data.message);
    })
    .catch(error => {
      // console.log('Sign up error ', error.response.data);
      setValues({...values, buttonText: 'Update'})
      toast.error(error.response.data.error);
    })
  }

  return (
    <React.Fragment>
      <ToastContainer />
      <Header />
      { !isAuth() ? <Redirect to='/' /> : null }
      <div className="container-fluid">
        <div className="row">
          <div className="col col-md-3 col-lg-2 aside-bar">
            <AsideBar />
          </div>
          <div className="col col-md-9 col-lg-10">
            <div className="row">
              <div className="col-md-12">
                <div className="form-signin">
                  <form onSubmit={handleUpdate}>
                    <h1 className="h3 mb-3 fw-normal">Profile update</h1>
                    <div className="form-floating">
                      <input className="form-control" type="text" placeholder="Name" onChange={handleChange('name')} value={name} />
                      <label>User name</label>
                    </div>
                    <div className="form-floating">
                      <input className="form-control br-0" type="email" placeholder="email" onChange={handleChange('email')} value={email} disabled />
                      <label>Email address</label>
                    </div>
                    <div className="form-floating">
                      <input className="form-control" type="text" placeholder="role" onChange={handleChange('role')} value={role} disabled />  
                      <label>Role</label>
                    </div>
                    <div className="form-floating">
                      <input className="form-control" type="password" placeholder="password" onChange={handleChange('password')} value={password} />  
                      <label>Password</label>
                    </div>
                    <button className="w-100 btn btn-lg btn-primary" type="submit">{buttonText}</button>
                    <p className="mt-5 mb-3 text-muted">&copy; 2021</p>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default Settings;