import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { getCookie, signout } from '../auth/Helpers';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

import Header from '../Header';
import AsideBar from './Aside';

const UpdateTask = (history) => {
  const [loading, setLoading] = useState(false);
  // const currentUser = isAuth().email;
  const taskId = history.match.params.id;
  const [values, setValues] = useState({
    title: "",
    description: "",
    status: "",
    buttonText: "Update task"
  })
  const token = getCookie('token');
  const {title, description, status, buttonText} = values;
  const taskStatusOptions = ['open', 'inprogress', 'completed'];

  useEffect(() => {
    loadTask();
  }, []);

  const loadTask = () => {
    axios({
      method: 'GET',
      url: `${process.env.REACT_APP_API}/alltasks/${taskId}`,
      headers : {
        Authorization: `Bearer ${token}`
      }
    })
    .then(response => {
      // console.log(response.data);
      const { title, description, status} = response.data;
      setValues({...values, title, description, status});
      setLoading(true);
    })
    .catch(error => {
      // console.log("task loading error ", error);
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

  const handleSubmit = (event) => {
    event.preventDefault();
    setValues({...values, buttonText: 'Updating task...'});
    axios({
      method: 'PUT',
      url: `${process.env.REACT_APP_API}/todo/update`,
      headers : {
        Authorization: `Bearer ${token}`
      },
      data: { _id: taskId, title, description, status }
    })
    .then(response => {
      setValues({...values, buttonText: 'Update task'})
      toast.success(`Task updated!`);
    })
    .catch(error => {
      setValues({...values, buttonText: 'Task not updated, try again'})
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
              {
                  loading ?
                  ( <div className="form-signin m-0">
                      <nav className="mb-3">
                        <Link to='/alltasks' className="mb-3"><i className="bi bi-arrow-left"></i></Link>
                      </nav>
                      <form onSubmit={handleSubmit}>
                        <div className="form-floating mb-3">
                          <input className="form-control" type="text" placeholder="Title" onChange={handleChange('title')} value={title} />
                          <label>Title</label>
                        </div>
                        <div className="form-floating mb-3">
                          <input className="form-control" type="text" placeholder="Description" onChange={handleChange('description')} value={description} />
                          <label>Description</label>
                        </div>
                        <div className="mb-3">
                          <select className="form-select" aria-label="Default select example" onChange={handleChange('status')} value={status}>
                            {
                              taskStatusOptions.map((item, index) => {
                                return <option key={index} value={item}>{item}</option>
                              })
                            }
                          </select>
                        </div>
                        <button className="w-100 btn btn-lg btn-primary" type="submit">{buttonText}</button>
                      </form>
                    </div> )
                  :
                  'loading...'
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default UpdateTask;