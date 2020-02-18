import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import RoutingComponent from './routingComponent';


class Header extends Component {
  render() {
    return (
      <React.Fragment>
        <nav className="navbar navbar-dark text-dark blue-gradient">
          <Link to={'/'}><span className="navbar-brand"><h4>UKart</h4></span> </Link>
          <form className="form-inline">
            <input
              className="form-control mr-sm-0"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button className="btn btn-dark my-1 my-sm-0" type="submit">
              <i className="material-icons" style={{ float: "left" }}>search</i>
            </button>
          </form>
          <Link to={'/login'}> <button className="btn btn-outline-dark">Login</button></Link>
        </nav>
        <RoutingComponent />
      </React.Fragment>
    );
  }
}

export default Header;