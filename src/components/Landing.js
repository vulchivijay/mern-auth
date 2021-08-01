import React from 'react';
import Header from './Header';

export default function Landing () {
  return (
    <React.Fragment>
      <Header />
      <div className="container">
        <h1 className="h1 mb-3 fw-normal">Landing page</h1>
      </div>
    </React.Fragment>
  )
}