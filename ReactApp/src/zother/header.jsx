import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import RoutingComponent from './routingComponent';
import Logout from './login/logout';

class Header extends Component {
  render() {
    const {toggleLogin,isCustomerLoggedin,setCustomerLogin} = this.props;
    return (
      <React.Fragment>
        <nav className="navbar navbar-dark text-dark blue-gradient">
          <Link to={'/'}  onClick={()=>toggleLogin(false) }>
            <img src={"../logo.png"} alt="UKART" style={{width:"10rem"}} className="img-responsive" />
          </Link>
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
         {isCustomerLoggedin?
          <Logout setCustomerLogin = {setCustomerLogin} /> :
          <Link to={'/login'}> <button className="btn btn-outline-dark" onClick={() => toggleLogin(true) }>Login</button></Link>
          }
        </nav>
        <RoutingComponent />
      </React.Fragment>
    );
  }
}

export default Header;