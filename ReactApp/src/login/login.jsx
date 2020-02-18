import React, { Component } from "react";
import { Link } from "react-router-dom";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      emailId: '',
      loginPassword: '',
      formErrors: {
        emailIdErr: '',
        loginPasswordErr: ''
      },
      fieldValidity: {
        emailId: false,
        loginPassword: false
      },
      formValid: false
    };
  }

  setFormValidity = () =>{
    this.setState({
      formValid : this.state.fieldValidity.emailId && 
                  this.state.fieldValidity.loginPassword
    });
  }

  getEmailId = event => {
    let emailId = event.target.value;
    let formErrors = this.state.formErrors;
    let fieldValidity = this.state.fieldValidity;
    this.setState({ emailId });
    if(emailId.length > 0){
      formErrors.emailIdErr = "";
      fieldValidity.emailId = true;
    }else{
      formErrors.emailIdErr = "Enter your email!";
      fieldValidity.emailId = false;
    }
      this.setState({formErrors});
      this.setState({ fieldValidity});
      this.setFormValidity();
  };

  getLoginPassword = event => {
    let loginPassword = event.target.value;
    let formErrors = this.state.formErrors;
    let fieldValidity = this.state.fieldValidity;
    this.setState({ loginPassword });
    if(loginPassword.length > 0){
      formErrors.loginPasswordErr = "";
      fieldValidity.loginPassword = true;
    }else{
      formErrors.loginPasswordErr = "Enter your password!";
      fieldValidity.loginPassword = false;
    }
    this.setState({ formErrors});
    this.setState({ fieldValidity});
    this.setFormValidity();
  };

  handleSubmit= event =>{
    event.preventDefault();
    let formErrors = this.state.formErrors;
    let fieldValidity = this.state.fieldValidity;
    if(this.state.emailId.length === 0){
      formErrors.emailIdErr = "Enter your email!";
      fieldValidity.emailId = false;
    }
    if(this.state.loginPassword.length === 0 ){
      formErrors.loginPasswordErr = "Enter your password!";
      fieldValidity.loginPassword = false;
    }
    this.setState({ formErrors});
    this.setState({ fieldValidity});
    this.setState({formValid : fieldValidity.emailId && fieldValidity.loginPassword});

    if (this.state.formValid) {
      console.log(this.state);
    }
  }

  render() {
    let enableButton = this.state.formValid?'btn-dark':'btn-outline-dark';
    return (
      <div className="col-md-4 offset-4 top-space">
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
                  onChange={this.getEmailId}
                  value={this.state.emailId}
                  autoComplete= {"off"}
                />
                <small  className="text-danger">{this.state.formErrors.emailIdErr}</small>
              </div>

              <div className="form-group">
                <label htmlFor="login-password">Password</label>
                <input
                  id="login-password"
                  type="password"
                  className="form-control"
                  onChange={this.getLoginPassword}
                  value={this.state.loginPassword}
                />
                <small className="text-danger">{this.state.formErrors.loginPasswordErr}</small>
              </div><br/>
              
              <button type="submit" className={`btn ${enableButton} btn-block`}>
                Login
              </button>
            </form>
          </div>
        </div>
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
