import { React, Component, connect, Link, Tile, Field } from "../../library";

import { setLoader, setErrorMessage, setSuccessMessage } from "../../redux/misc/misc.action";
import { validateEmail, validateUsername, validatePassword } from "../../utils/loginUtils";
import * as api from "../../api/api.js";

const INITIAL_STATE = {
    username: "",
    email: "",
    password: "",
    rePassword: "",
    error: {
        username: "",
        email: "",
        password: "",
        rePassword: "",
    }
};

const mapDispatchToProps = dispatch => ({
    setLoader: (status) => dispatch(setLoader(status)),
    setErrorMessage: (errors) => dispatch(setErrorMessage(errors)),
    setSuccessMessage: (success) => dispatch(setSuccessMessage(success))
});

class Signup extends Component {
    constructor() {
        super();
        this.state = INITIAL_STATE;
    }
    
    validateForm = () => {
        const {username, email, password, rePassword} = this.state;
        const error = {};
        error.username = validateUsername(username);
        error.email =  validateEmail(email);
        error.password = validatePassword(password);
        error.rePassword = rePassword === password?"":"Passwords must match";
        this.setState({error});
        return !(error.userId||error.email||error.password||error.rePassword);
    }

    handleSubmit = event => {
        const { setLoader, setErrorMessage, setSuccessMessage } = this.props;
        event.preventDefault();
        if(this.validateForm()){
            setLoader(true);
            api.createCustomerAccount(this.state).then( response =>{
                this.setState(INITIAL_STATE);
                this.props.history.push('/user/login');
                setErrorMessage([]);
                setSuccessMessage([response]);
                setLoader(false);
            },reject =>{ 
                setErrorMessage([reject]);
                setLoader(false);
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
        const {username, email, password, rePassword, error} = this.state;
        return (
                <Tile 
                    id = "CREATE_ACCOUNT"
                    header = {<h4>Create account</h4>}>
                    <Field
                        id="username"
                        inputType="TEXTBOX"
                        name="username"
                        value = {username}
                        errorlabel = {error.username}
                        onChange = {this.handleChange}
                        label="Your name"/>
                    <Field
                        id="email"
                        inputType="TEXTBOX"
                        name="email"
                        value = {email}
                        errorlabel = {error.email}
                        onChange = {this.handleChange}
                        label="Email"/>
                    <Field
                        id="password"
                        inputType="PASSWORD"
                        name="password"
                        value = {password}
                        errorlabel = {error.password}
                        onChange = {this.handleChange}
                        label="Password"/>
                    <Field
                        id="re-password"
                        inputType="PASSWORD"
                        name="rePassword"
                        value = {rePassword}
                        errorlabel = {error.rePassword}
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

export default connect(null, mapDispatchToProps)(Signup);