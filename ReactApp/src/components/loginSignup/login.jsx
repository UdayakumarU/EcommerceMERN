import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { Tile, Field } from "../../library"; 
import { loginUser } from "../../redux/user/user.action";
import * as api from "../../api/api.js";
import { validateUserId, validatePassword } from "../../utils/loginUtils";

const mapDispatchToProps = dispatch =>({
    loginUser : (user) => dispatch(loginUser(user))
});

const INITIAL_STATE = {
    userId: "",
    password: "",
    error :{
        userId:"",
        password:""
    }
};

class Login extends Component {
    constructor() {
        super();
        this.state = INITIAL_STATE;
    }

    validateForm = () => {
        const error = {};
        error.userId = validateUserId(this.state.userId);
        error.password = validatePassword(this.state.password);
        this.setState({error});
        return !(error.userId||error.password);
    }

    handleSubmit = event => {
        event.preventDefault();
        if(this.validateForm()){
            api.loginCustomer(this.state).then( response =>{
                this.props.loginUser({
                    userId: response.customerId, 
                    userName: response.customerName,
                    loginStatus:true
                });
                this.setState(INITIAL_STATE);
            }, reject =>{ 
                console.log(reject);//throw ui error message later
            })
        }
    };

    handleChange = event => {
        const { name, value } = event.target;
        const error = {...this.state.error};
        error[name] = "";
        this.setState({ [name]: value });
        this.setState({ error });
    };

    render() {
        const {userId, password, error} = this.state;
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
                        errorlabel = {error.userId}
                        onChange = {this.handleChange}
                        label = "Email or mobile phone number"/>
                    <Field
                        id="password" 
                        inputType="PASSWORD"
                        name="password"
                        value = {password}
                        errorlabel = {error.password}
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