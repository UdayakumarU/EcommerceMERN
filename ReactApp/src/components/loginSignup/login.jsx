import { React, Component, connect, Link, Tile, Field } from "../../library";

import { getHomeProducts } from "../../redux/product/product.selector";
import { getCartItems } from "../../redux/cart/cart.selector";
import { getLoginFromCheckout } from "../../redux/misc/misc.selector";
import { loginCustomer } from "../../redux/customer/customer.action";
import { mergeCustomerCart } from "../../redux/cart/cart.action";
import { setLoader, setErrorMessage, setSuccessMessage, setLoginFromCheckout } from "../../redux/misc/misc.action";

import { validateUserId, validatePassword } from "../../utils/loginUtils";
import { removeSelectedProducts } from "../../utils/cartUtils";

import * as api from "../../api/api.js";

const INITIAL_STATE = {
    userId: "",
    password: "",
    error: {
        userId: "",
        password: ""
    }
};

const mapStateToProps = () => ({
    products: getHomeProducts(), 
    cartItems: getCartItems(),
    loginFromCheckout: getLoginFromCheckout()
});

const mapDispatchToProps = dispatch => ({
    loginCustomer: (user) => dispatch(loginCustomer(user)),
    setLoader: (status) => dispatch(setLoader(status)),
    setErrorMessage: (errors) => dispatch(setErrorMessage(errors)),
    setSuccessMessage: (success) => dispatch(setSuccessMessage(success)),
    unsetLoginFromCheckout:() => dispatch(setLoginFromCheckout(false)),
    mergeCustomerCart: (cartProducts) => dispatch(mergeCustomerCart(cartProducts)),
});

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

    mergeCustomerCart = (savedCartItems) => {
       const { products, cartItems, mergeCustomerCart } = this.props;
       const cartProducts = [];
       const savedCartItemsAfterFilter = removeSelectedProducts(cartItems, savedCartItems);
       savedCartItemsAfterFilter.forEach(cartItem => {
            let result = products.find(product => product.productId === cartItem.productId);
            result && cartProducts.push(result);
        });
        mergeCustomerCart(cartProducts);
    }

    handleSubmit = event => {
        const {loginCustomer, setLoader, setErrorMessage, setSuccessMessage, loginFromCheckout, unsetLoginFromCheckout, history} = this.props;
        event.preventDefault();
        if(this.validateForm()){
            setLoader(true);
            api.loginCustomer(this.state).then( response =>{
                const {token, customerData, message} = response;
                loginCustomer({
                    id: customerData.customerId, 
                    name: customerData.customerName,
                    loginStatus: true,
                    loginToken: token
                });
                this.mergeCustomerCart(customerData.cart);
                this.setState(INITIAL_STATE);
                if(loginFromCheckout){
                    unsetLoginFromCheckout();
                    history.goBack();
                }
                else
                    history.push('/');
                setErrorMessage([]);
                setSuccessMessage([message]);
                setLoader(false);
            }, reject =>{ 
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
        const {userId, password, error} = this.state;
        return (
            <React.Fragment> 
                <Tile 
                    id = "LOGIN"
                    header = {<h4>Login</h4>}>
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

export default connect(mapStateToProps, mapDispatchToProps)(Login);