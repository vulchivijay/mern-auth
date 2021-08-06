import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { isAuth, getCookie, signout } from '../auth/Helpers';

import Header from '../Header';
import AsideBar from './Aside';

const Users = ({history}) => {
  const [values, setValues] = useState([]);
  const [loading, setLoading] = useState(false);
  const token = getCookie('token');

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = () => {
    axios({
      method: 'GET',
      url: `${process.env.REACT_APP_API}/users`,
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
      // console.log("user list error ", error);
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
            <div className="table-responsive">
              {
                loading ?
                <table className="table table-striped table-sm">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Name</th>
                      <th>Email address</th>
                      <th>Role</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      values.data.map( (item, index) => {
                        return <UserTable key={index} data={item} index={index} />
                      })
                    }
                  </tbody>
                </table>
                :
                'loading...'
              }
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

const UserTable = ({ data, index }) => {
  return (
    <tr>
      <td>{index}</td>
      <td>{data.name}</td>
      <td>{data.email}</td>
      <td>{data.role}</td>
      <td className="text-center"><i class="bi bi-trash"></i></td>
    </tr>
  )
}

export default Users;