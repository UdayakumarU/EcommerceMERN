import React, { Component } from 'react';

class Header extends Component {
    render() { 
        return ( 
            <nav className="navbar navbar-dark text-dark blue-gradient">
          <span className="navbar-brand">Brand Logo</span>
          <form className="form-inline">
            <input
              className="form-control mr-sm-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button className="btn btn-dark my-1 my-sm-0" type="submit">
              Search
            </button>
          </form>
        </nav>
         );
    }
}
 
export default Header;