import React, { Component } from "react";
import { Link } from "react-router-dom";

import { Tile, Field } from "../library"; 

const INITIAL_STATE = {
    username: "",
    email:"",
    password: "",
    rePassword:""
};

class Signup extends Component {
    constructor() {
        super();
        this.state = INITIAL_STATE;
    }

    handleSubmit = event => {
        event.preventDefault();
        this.setState(INITIAL_STATE);
    };

    handleChange = event => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    };

    render() {
        const {username, email, password, rePassword} = this.state;
        return (
                <Tile 
                    id = "CREATE_ACCOUNT"
                    title = "Create account">
                    <Field
                        id="username" 
                        inputType="TEXTBOX"
                        name="username"
                        value = {username}
                        onChange = {this.handleChange}
                        label="Your name"/>
                    <Field
                        id="email" 
                        inputType="TEXTBOX"
                        name="email"
                        value = {email}
                        onChange = {this.handleChange}
                        label="Email"/>    
                    <Field
                        id="password" 
                        inputType="PASSWORD"
                        name="password"
                        value = {password}
                        onChange = {this.handleChange}
                        label="Password"/>
                    <Field
                        id="re-password" 
                        inputType="PASSWORD"
                        name="rePassword"
                        value = {rePassword}
                        onChange = {this.handleChange}
                        label="Re-enter password"/>
                    <button 
                        className="btn btn-block _primary_bg"
                        onClick={this.handleSubmit}>
                        Create your account
                    </button>
                    <span className="_text_sm">
                        Already have an account?<Link to="/user/login"> Sign-In </Link>
                    </span>
                </Tile>
        );
    }
}

export default Signup;