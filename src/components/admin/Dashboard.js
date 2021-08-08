import React from 'react';
import Header from './../Header';
import AsideBar from './Aside';
import TasksCount from './TasksCount';

const Dashboard = ({history}) => {

  return (
    <React.Fragment>
      <Header />
      <div className="container-fluid">
        <div className="row">
          <div className="col col-md-3 col-lg-2 aside-bar">
            <AsideBar history={history}/>
          </div>
          <div className="col col-md-9 col-lg-10">
            <TasksCount />
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default Dashboard;