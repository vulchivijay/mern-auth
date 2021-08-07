import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { isAuth, getCookie, signout } from '../auth/Helpers';

import Header from '../Header';
import AsideBar from './Aside';

const AllTasks = ({history}) => {
  const [values, setValues] = useState({
    title: "",
    description: "",
    status: "",
    email: ""
  });
  const [loading, setLoading] = useState(false);
  const currentUser = isAuth().email;

  const token = getCookie('token');

  useEffect(() => {
    loadTodos();
  }, []);

  const loadTodos = () => {
    axios({
      method: 'GET',
      url: `${process.env.REACT_APP_API}/todos`,
      headers : {
        Authorization: `Bearer ${token}`
      }
    })
    .then(response => {
      // console.log(response.data);
      let data = [];
      response.data.map(item => {
        return data.push(item);
      })
      setValues({...values, data});
      setLoading(true);
    })
    .catch(error => {
      // console.log("todos loading error ", error);
      if(error.response.status === 401) {
        signout(() => {
          history.push('/signin');
        })
      }
    })
  }

  return (
    <React.Fragment>
      <Header />
      <div className="container-fluid">
        <div className="row">
          <div className="col col-md-3 col-lg-2 aside-bar">
            <AsideBar />
          </div>
          <div className="col col-md-9 col-lg-10">
            <div className="row">
              <div className="col-md-12">
                <p className="bg-light p-2 text-dark">Open tasks</p>
                {
                  loading ?
                  <TodoTable data={values.data} type="open" user={currentUser} />
                  :
                  'loading...'
                }
              </div>
              <div className="col-md-12">
                <p className="bg-light p-2 text-dark">Inprogress tasks</p>
                {
                  loading ?
                  <TodoTable data={values.data} type="inprogress" user={currentUser} />
                  :
                  'loading...'
                }
              </div>
              <div className="col-md-12">
                <p className="bg-light p-2 text-dark">Completed tasks</p>
                {
                  loading ?
                  <TodoTable data={values.data} type="completed" user={currentUser} />
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

const TodoTable = ({data, type, user}) => {
  return (
    <div className="table-responsive">
      <table className="table table-striped table-sm">
        <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Description</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {
            data.map( (item, index) => {
              if (item.status === type && item.email === user) {
                return <TodoTableRow key={index} data={item} index={index} />
              } else {
                return null;
              }
            })
          }
        </tbody>
      </table>
    </div>
  )
}

const TodoTableRow = ({ data, index }) => {
  return (
    <tr>
      <td>{index}</td>
      <td>{data.title}</td>
      <td>{data.description}</td>
      <td>{data.status}</td>
      <td className="text-center">
        <i className="bi bi-pencil"></i>{' '}
        <i className="bi bi-trash"></i>
      </td>
    </tr>
  )
}

export default AllTasks;