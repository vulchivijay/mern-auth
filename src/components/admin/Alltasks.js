import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { isAuth, getCookie, signout } from '../auth/Helpers';

import Header from '../Header';
import AsideBar from './Aside';

const AllTasks = ({history}) => {
  const [values, setValues] = useState();
  const [loading, setLoading] = useState(false);
  const currentUser = isAuth().email;

  const token = getCookie('token');

  useEffect(() => {
    loadTodos();
  }, []);

  const loadTodos = () => {
    axios({
      method: 'GET',
      url: `${process.env.REACT_APP_API}/todos/${currentUser}`,
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
      setValues(data);
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

  const sortTable = (key) => {
    const sorted = [...values].sort((a, b) => (a[key] - b[key] ? 1 : -1));
    setValues(sorted);
  }

  return (
    <React.Fragment>
      <Header />
      <div className="container-fluid">
        <div className="row">
          <div className="col col-md-3 col-lg-2 aside-bar">
            <AsideBar history={history}/>
          </div>
          <div className="col col-md-9 col-lg-10">
            <div className="row">
              <div className="col-md-12">
                <p>Following like jira tool</p>
                {
                  loading ?
                  <TodoTable data={values} sort={sortTable} />
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

const TodoTable = ({data, sort}) => {
  return (
    <div className="table-responsive tasks-table">
      <table className="table table-striped table-md table-bordered">
        <thead className="table-dark">
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Description</th>
            <th onClick={() => sort('status')}>Status</th>
            <th>Created at</th>
            <th>Updated at</th>
            {/* <th></th> */}
          </tr>
        </thead>
        <tbody>
          {
            data
            .map( (item, index) => {
              return <TodoTableRow key={index} data={item} index={index} />
            })
          }
        </tbody>
      </table>
    </div>
  )
}

const TodoTableRow = ({ data, index }) => {
  const startDate = DateTime(data.createdAt);
  const updatedDate = DateTime(data.updatedAt);
  return (
    <tr>
      <td><Link to={`/alltasks/${data._id}`} >{ index }</Link></td>
      <td><Link to={`/alltasks/${data._id}`} >{ data.title }</Link></td>
      <td>{ data.description }</td>
      <td>{ data.status }</td>
      <td>{ startDate }</td>
      <td>{ updatedDate }</td>
      {/* <td className="text-right">
        <i className="bi bi-pencil"></i>{' '}
        <i className="bi bi-trash"></i>
      </td> */}
    </tr>
  )
}

const DateTime = (timestamp) => {
  const TimeStamp = new Date(timestamp);
  const D = Zeros(TimeStamp.getDate(), 2);
  const M = Zeros(TimeStamp.getMonth() + 1, 2);
  const Y = TimeStamp.getFullYear();
  var newDate = D + "-" + M + "-" + Y;
  return newDate;
}

const Zeros = (num, places) => {
  const zero = places - num.toString().length + 1;
  return Array(+(zero > 0 && zero)).join("0") + num;
}

export default AllTasks;