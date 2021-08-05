import React from 'react';
import Header from '../Header';
import AsideBar from './Aside';

const AllTasks = () => {
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
                Open tasks
              </div>
              <div className="col-md-12">
                Inprogress tasks
              </div>
              <div className="col-md-12">
                Completed tasks
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default AllTasks;