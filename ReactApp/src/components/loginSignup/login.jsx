import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { Tile, Field } from "../../library"; 
import { loginUser } from "../../redux/user/user.action";

const mapDispatchToProps = dispatch =>({
    loginUser : (user) => dispatch(loginUser(user))
});

const INITIAL_STATE = {
    userId: "",
    password: ""
};

class Login extends Component {
    constructor() {
        super();
        this.state = INITIAL_STATE;
    }

    handleSubmit = event => {
        event.preventDefault();
        this.props.loginUser(this.state);
        this.setState(INITIAL_STATE);
    };

    handleChange = event => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    };

    render() {
        const {userId, password} = this.state;
        return (
            <React.Fragment> 
                <Tile 
                    id = "LOGIN"
                    title = "Login">
                    <Field
                        id="user-id" 
                        inputType="TEXTBOX"
                        name="userId"
                        value = {userId}
                        onChange = {this.handleChange}
                        label = "Email or mobile phone number"/>
                    <Field
                        id="password" 
                        inputType="PASSWORD"
                        name="password"
                        value = {password}
                        onChange = {this.handleChange}
                        label="Password"/>
                    <button 
                        className="btn btn-block _primary_bg"
                        onClick={this.handleSubmit}>
                        Login
                    </button>
                </Tile>
                <span className="_text_sm_light">New to Ukart?</span>
                <Link to={"/user/register"} style={{ textDecoration: 'none' }}>
                    <button
                        className="btn btn-block btn-outline-dark">
                        Create your account
                    </button>
                </Link>
            </React.Fragment>
        );
    }
}

export default connect(null, mapDispatchToProps)(Login);