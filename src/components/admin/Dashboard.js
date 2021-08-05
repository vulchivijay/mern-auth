import React from 'react';
import Header from './../Header';
import AsideBar from './Aside';

const Dashboard = () => {
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
              <div className="col-md-4">Open tasks</div>
              <div className="col-md-4">Inprogress tasks</div>
              <div className="col-md-4">Completed tasks</div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default Dashboard;