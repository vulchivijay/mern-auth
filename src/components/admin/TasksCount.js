import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { isAuth, getCookie, signout } from '../auth/Helpers';

const TasksCount = ({history}) => {
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

  return (
    <div className="row">
      <div className="col-md-4">
        <div className="card text-center">
          <h1>{loading ? <Count data={values} type="open" /> : 0}</h1>
          <div className="card-body">Open</div>
        </div>
      </div>
      <div className="col-md-4">
        <div className="card text-center">
          <h1>{loading ? <Count data={values} type="inprogress" /> : 0}</h1>
          <div className="card-body">Inprogress</div>
        </div>
      </div>
      <div className="col-md-4">
        <div className="card text-center">
          <h1>{loading ? <Count data={values} type="completed" /> : 0}</h1>
          <div className="card-body">Complete</div>
        </div>
      </div>
    </div>
  )
}

const Count = ({data, type}) => {
  let num = 0;
  data.map(item => {
    if (item.status === type) {
      num++;
    }
    return num;
  })
  return num;
}

export default TasksCount;