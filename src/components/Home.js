import React from 'react';
import Header from './Header';

export default function Home () {
  return (
    <React.Fragment>
      <Header />
      <div className="home-page">
        <h1>Home page</h1>
      </div>
    </React.Fragment>
  )
}