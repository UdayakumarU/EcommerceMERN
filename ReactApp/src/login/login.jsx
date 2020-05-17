import React, { Component } from "react";
import { Link,Redirect } from "react-router-dom";
import { loginCustomer } from "../api/api";

class Login extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      customerEmail: '',
      customerPassword: '',
      formErrors: {
        customerEmailError: '',
        customerPasswordError: ''
      },
      fieldValidity: {
        customerEmail: false,
        customerPassword: false
      },
      formValid: false,
      errorMessage: "",
      isLoginSuccess:(localStorage.length > 0)
    };
  }
  componentDidMount(){
  }

  setFormValidity = () => {
    this.setState({
      formValid: this.state.fieldValidity.customerEmail &&
        this.state.fieldValidity.customerPassword
    });
  }

  getLoginEmail = event => {
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

  getLoginPassword = event => {
    let customerPassword = event.target.value;
    let formErrors = this.state.formErrors;
    let fieldValidity = this.state.fieldValidity;
    this.setState({ customerPassword });
    if (customerPassword.length > 0) {
      formErrors.customerPasswordError = "";
      fieldValidity.customerPassword = true;
    } else {
      formErrors.customerPasswordError = "Enter your password!";
      fieldValidity.customerPassword = false;
    }
    this.setState({ formErrors });
    this.setState({ fieldValidity });
    this.setFormValidity();
  };

  handleSubmit = event => {
    event.preventDefault();
    let formErrors = this.state.formErrors;
    let fieldValidity = this.state.fieldValidity;
    if (this.state.customerEmail.length === 0) {
      formErrors.customerEmailError = "Enter your email!";
      fieldValidity.customerEmail = false;
    }
    if (this.state.customerPassword.length === 0) {
      formErrors.customerPasswordError = "Enter your password!";
      fieldValidity.customerPassword = false;
    }
    this.setState({ formErrors });
    this.setState({ fieldValidity });
    this.setFormValidity();
    if (this.state.formValid) {
      loginCustomer(this.state).then(response => {
          localStorage.setItem('customerId', response.customerId);
          localStorage.setItem('customerName', response.customerName);
          localStorage.setItem('cart', response.cart);
          this.setState({isLoginSuccess:true})
          this.props.setCustomerLogin(true);
        }).catch(errorMessage => {
          this.setState({ errorMessage });
        })
    }
  }

  render() {
    if (this.state.isLoginSuccess) {
      return <Redirect to='/' />
    }
    let enableButton = this.state.formValid ? 'btn-dark' : 'btn-outline-dark';
    return (
      <div className="col-lg-4 col-md-6 col-sm-8 col-xs-8 offset-lg-4 offset-md-3 offset-sm-2 offset-xs-2 top-space">
        <div className="card">
          <h4 className="card-header">Login</h4>
          <div className="card-body">
            <form onSubmit={this.handleSubmit}>
              <div className="form-group">
                <label htmlFor="email-Id">Email address</label>
                <input
                  id="email-Id"
                  type="text"
                  className="form-control"
                  onChange={this.getLoginEmail}
                  value={this.state.customerEmail}
                  autoComplete={"off"}
                />
                <small className="text-danger">{this.state.formErrors.customerEmailError}</small>
              </div>

              <div className="form-group">
                <label htmlFor="login-password">Password</label>
                <input
                  id="login-password"
                  type="password"
                  className="form-control"
                  onChange={this.getLoginPassword}
                  value={this.state.customerPassword}
                />
                <small className="text-danger">{this.state.formErrors.customerPasswordError}</small>
              </div><br />
              <button type="submit" className={`btn ${enableButton} btn-block`}>
                Login
              </button>
            </form>
          </div>
        </div>
        {this.state.errorMessage &&
          <div className="alert alert-danger text-center" role="alert">
            {this.state.errorMessage}
          </div>
        }
        <small className="form-text text-muted textover-line">
          New to UKart?
        </small>
        <Link to={"/signup"}>
          <button className="btn btn-primary btn-block" >
            Create your UKart Account
          </button>
        </Link>
      </div>
    );
  }
}

export default Login;
