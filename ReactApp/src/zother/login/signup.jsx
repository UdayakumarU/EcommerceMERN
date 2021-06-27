import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {createCustomerAccount} from '../../api/api';
class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      customerName: '',
      customerEmail: '',
      customerPassword: '',
      customerMobile: '',
      formErrors: {
        customerNameError: '',
        customerEmailError: '',
        customerPasswordError: ''
      },
      fieldValidity: {
        customerName: false,
        customerEmail: false,
        customerPassword: false
      },
      formValid: false
    };
  }

  setFormValidity = () => {
    this.setState({
      formValid: this.state.fieldValidity.customerEmail &&
        this.state.fieldValidity.customerPassword &&
        this.state.fieldValidity.customerName
    });
  }

  getCustomerEmail = event => {
    let customerEmail = event.target.value;
    let formErrors = this.state.formErrors;
    let fieldValidity = this.state.fieldValidity;
    this.setState({ customerEmail });
    if (customerEmail.length > 0) {
      formErrors.customerEmailError = "";
      fieldValidity.customerEmail = true;
    } else {
      formErrors.customerEmailError = "Enter your email!";
      fieldValidity.customerEmail = false;
    }
    this.setState({ formErrors });
    this.setState({ fieldValidity });
    this.setFormValidity();
  };

  getCustomerMobile = event => {
    this.setState({ customerMobile : event.target.value});
  };
  getCustomerPassword = event => {
    let customerPassword = event.target.value;
    let formErrors = this.state.formErrors;
    let fieldValidity = this.state.fieldValidity;
    this.setState({ customerPassword });
    if (customerPassword.length > 5) {
      formErrors.customerPasswordError = "";
      fieldValidity.customerPassword = true;
    } else {
      if (customerPassword.length === 0)
        formErrors.customerPasswordError = "Enter your password!";
      else
        formErrors.customerPasswordError = "Passwords must be at least 6 characters!";
      fieldValidity.customerPassword = false;
    }
    this.setState({ formErrors });
    this.setState({ fieldValidity });
    this.setFormValidity();
  };

  getCustomerName = event => {
    let customerName = event.target.value;
    let formErrors = this.state.formErrors;
    let fieldValidity = this.state.fieldValidity;
    this.setState({ customerName });
    if (customerName.length > 0) {
      formErrors.customerNameError = "";
      fieldValidity.customerName = true;
    } else {
      formErrors.customerNameError = "Enter your name!";
      fieldValidity.customerName = false;
    }
    this.setState({ formErrors });
    this.setState({ fieldValidity });
    this.setFormValidity();
  };

  handleSubmit = event => {
    event.preventDefault();
    let formErrors = this.state.formErrors;
    let fieldValidity = this.state.fieldValidity;
    if (this.state.customerName.length === 0) {
      formErrors.customerNameError = "Enter your name!";
      fieldValidity.customerName = false;
    }
    if (this.state.customerEmail.length === 0) {
      formErrors.customerEmailError = "Enter your email!";
      fieldValidity.customerEmail = false;
    }
    if (this.state.customerPassword.length < 6) {
      formErrors.customerPasswordError = "Passwords must be at least 6 characters!";
      if (this.state.customerPassword.length === 0)
        formErrors.customerPasswordError = "Enter your password!";
      fieldValidity.customerPassword = false;
    }
    this.setState({ formErrors });
    this.setState({ fieldValidity });
    this.setFormValidity();

    if (this.state.formValid) {
      createCustomerAccount(this.state)
        .then( response =>{ 
          console.log(response);
        })
        .catch( errorMessage =>{
          console.log(errorMessage);
        })
    }
  }
  render() {
    let enableButton = this.state.formValid?'btn-dark':'btn-outline-dark';
    return (
      <div className="col-lg-4 col-md-6 col-sm-8 col-xs-8 offset-lg-4 offset-md-3 offset-sm-2 offset-xs-2 top-space">
        <div className="card">
          <h4 className="card-header">Create Account</h4>
          <div className="card-body">
            <form onSubmit={this.handleSubmit}>
              <div className="form-group">
                <label htmlFor="username">Your name</label>
                <input 
                  type="text" 
                  className="form-control" 
                  id="Customer-Name" 
                  onChange={this.getCustomerName}
                  value={this.state.CustomerName} 
                />
                <small className="text-danger">{this.state.formErrors.customerNameError}</small>
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input 
                  type="text" 
                  className="form-control" 
                  id="Customer-Email"
                  onChange={this.getCustomerEmail}
                  value={this.state.CustomerEmail}  
                />
                <small className="text-danger">{this.state.formErrors.customerEmailError}</small>
              </div>

              <label htmlFor="mobileCode">Mobile number (optional)</label>
              <div className="form-row">
                <div className="form-group col-md-2 col-sm-2 col-xs-2">
                  <input  id="Mobile-Code" className="form-control" value="+91" readOnly disabled />
                </div>
                <div className="form-group col-md-10 col-sm-10 col-xs-10">
                  <input 
                    type="text" 
                    className="form-control" 
                    id="Customer-Mobile" 
                    maxLength="10" 
                    onChange={this.getCustomerMobile} 
                    value={this.state.customerMobile} 
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input 
                  type="password" 
                  className="form-control" 
                  id="Customer-Password"
                  onChange={this.getCustomerPassword}
                  value={this.state.customerPassword}   />
                  <small className="text-danger">{this.state.formErrors.customerPasswordError}</small>
              </div>
              <button type="submit" className={`btn ${enableButton} btn-block`}>Continue</button>
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