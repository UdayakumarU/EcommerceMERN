import React, { Component } from "react";
import Header from "./header";
import Footer from "./footer";
import { Route,Link } from 'react-router-dom';
import Login from "./login/login";
import Signup from "./login/signup";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogin:false,
      isCustomerLoggedin : (localStorage.length > 0)
    };
  }
  toggleLogin = (isLogin)=>{
    this.setState({isLogin});
  }
  setCustomerLogin = (isCustomerLoggedin) =>{
    this.setState({isCustomerLoggedin}); 
  }
  render() {
    return (  
      <React.Fragment>
       {this.state.isLogin === true? 
          <div>
            <Link to="/" onClick={this.toggleLogin}>
              <div className="text-center">
                <img src={"../logo.png"} alt="UKART" style={{ width: "10rem" }} className="img-responsive" />
              </div>
            </Link>
            <Route exact path="/login" render={props=> <Login {...props} setCustomerLogin = {this.setCustomerLogin}/>} />
            <Route exact path="/signup" render={() => <Signup/>} />
          </div>
        :
        <div>
          <Header 
            toggleLogin = {this.toggleLogin}
            setCustomerLogin ={this.setCustomerLogin}
            isCustomerLoggedin = {this.state.isCustomerLoggedin}/>
          <Footer/>
        </div>}
      </React.Fragment>
    );
  }
}

export default Home;
