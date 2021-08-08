import React, { useState } from 'react';
import axios from 'axios';
import { authenticate, getCookie, isAuth } from './../auth/Helpers';
import { ToastContainer, toast } from 'react-toastify';

import Header from '../Header';
import AsideBar from './Aside';

const NewTask = ({history}) => {

  const [values, setValues] = useState({
    title: "",
    description: "",
    buttonText: "Add task"
  })

  const {title, description, buttonText} = values;
  const status = "open";
  const email= isAuth().email
  const token = getCookie('token');

  const handleChange = (name) => (event) => {
    setValues({...values, [name]: event.target.value });
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    setValues({...values, buttonText: 'Adding task...'});
    axios({
      method: 'POST',
      url: `${process.env.REACT_APP_API}/addtodo`,
      headers : {
        Authorization: `Bearer ${token}`
      },
      data: { title, description, status, email }
    })
    .then(response => {
      // console.log('Sign in success', response);
      setValues({...values, title: '', description: '', buttonText: 'Add task'})
      toast.success(`Task added!`);
    })
    .catch(error => {
      // console.log('Sign in error ', error.response.data);
      setValues({...values, buttonText: 'Add task again'})
      toast.error(error.response.data.error);
    })
  }

  return (
    <React.Fragment>
      <ToastContainer />
      <Header />
      <div className="container-fluid">
        <div className="row">
          <div className="col col-md-3 col-lg-2 aside-bar">
            <AsideBar history={history}/>
          </div>
          <div className="col col-md-9 col-lg-10">
            <div className="row">
              <div className="col-md-12">
                <div className="form-signin m-0">
                  <form onSubmit={handleSubmit}>
                    <div className="form-floating mb-3">
                      <input className="form-control" type="text" placeholder="Title" onChange={handleChange('title')} value={title} />
                      <label>Title</label>
                    </div>
                    <div className="form-floating mb-3">
                      <input className="form-control" type="text" placeholder="Description" onChange={handleChange('description')} value={description} />
                      <label>Description</label>
                    </div>
                    <button className="w-100 btn btn-lg btn-primary" type="submit">{buttonText}</button>
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

export default NewTask;