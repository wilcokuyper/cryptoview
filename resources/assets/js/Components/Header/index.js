import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import './style.css';

export default () => {
  const auth = useSelector(state => state.auth);

  const renderAuthContent = auth => {
    switch(auth.isAuthenticated) {
      case null:
        return;
  
      case false:
        return <li><a href="/login/facebook" className="nav-link">Login</a></li>;
  
      default:
        return (
          <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">
              <img src={auth.user.avatar} className="mr-3 round" height="38"/>
              {auth.user.name}
            </a>
            <div className="dropdown-menu">
              <a className="dropdown-item" href="/logout">Logout</a>
            </div>
          </li>
        );
    }
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-info mb-5">

      <div className="container">

        <Link className="navbar-brand" to="/">Cryptoview</Link>

        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ml-auto">
            {renderAuthContent(auth)}
          </ul>
        </div>

      </div>

    </nav>
  )
}