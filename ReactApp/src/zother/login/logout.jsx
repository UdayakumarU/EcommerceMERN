import React, { Component } from "react";

export default class Logout extends Component {
    logoutCustomer = () =>{
        localStorage.clear();
        this.props.setCustomerLogin(false);
    }
    render(){
        return(<div>
         <button className="btn btn-outline-dark" onClick ={this.logoutCustomer}>Logout</button>
        </div>);
    }
}