import React, { Component } from 'react';
import {Link } from 'react-router-dom';

class Signup extends Component {
  render() {
    return (
      <div className="col-md-4 offset-4 top-space">
        <div className="card">
          <h4 className="card-header">Create Account</h4>

          <div className="card-body">
            <form>
                <div className="form-group">
                    <label htmlFor="username">Your Name</label>
                    <input type="text" className="form-control" id="username" />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" className="form-control" id="email" aria-describedby="emailHelp" />
                    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" className="form-control" id="password" />
                </div>
              <button type="submit" className="btn btn-outline-dark btn-block">Continue</button>
            </form>
            
            <small className="form-text textover-line">Already have an account?  
                <Link to={'/login'}> Sign in</Link>
            </small>
          </div>
        </div>  
            
        
      </div>
    );
  }
}

export default Signup; 