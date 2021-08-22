import React, { Component } from 'react'
import { connect } from 'react-redux';
import { withRouter } from "react-router";
import { Link } from 'react-router-dom';

import {Tile} from "../../library";
import { getCustomerLoginStatus, getCustomerName } from "../../redux/customer/customer.selector";
import { getCustomerLoginToken, getCheckoutStepStatus } from "../../redux/customer/customer.selector";
import { getCartItems } from "../../redux/cart/cart.selector";
import { logoutCustomer, setCheckoutStepStatus } from "../../redux/customer/customer.action";
import { emptyCart } from "../../redux/cart/cart.action";
import { setLoader, setErrorMessage } from "../../redux/misc/misc.action";
import { mapCartProductsToIds } from "../../utils/cartUtils";

import * as api from "../../api/api";
import  APP_CONST from "../../APP_CONST";

const mapStateToProps = (state) => {
    return {
        customerName : getCustomerName(state),
        customerLoginToken : getCustomerLoginToken(state),
        cartItems : getCartItems(state),
        isLoggedIn : getCustomerLoginStatus(state),
        stepOneStatus: getCheckoutStepStatus(state, "one")
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        logoutCustomer : () => dispatch(logoutCustomer()),
        emptyCart : () => dispatch(emptyCart()),
        setLoader : (status) => dispatch(setLoader(status)),
        setErrorMessage : (errors) => dispatch(setErrorMessage(errors)),
        setStatus : (step, status) => dispatch(setCheckoutStepStatus(step, status))
    }
};

class LoginCheck extends Component {
    getHeaderContent = (color) => (
        <React.Fragment>
            <span className={`badge badge-${color} px-2 py-1`}>1</span>
            <span className="text-muted px-3"><strong>LOGIN</strong></span>
        </React.Fragment>
    );

    logoutAndSignin = () =>{
        const {cartItems, customerLoginToken, emptyCart, logoutCustomer, setLoader, setErrorMessage, history} = this.props;
        const cartProductIds = mapCartProductsToIds(cartItems);
        setLoader(true);
        api.saveCartItems(cartProductIds, customerLoginToken).then( response => {
            response && emptyCart();
            logoutCustomer();
            history.push('/');
            setLoader(false);
        }, reject => {
            setErrorMessage([reject]);
            setLoader(false);
        });
    }

    changeDetail = () =>{
        this.props.setStatus("one", APP_CONST.OPEN);
        this.props.setStatus("two", false);
        this.props.setStatus("three", false);
        this.props.setStatus("four", false);
    }

    continueCheckout = () =>{
        this.props.setStatus("one", APP_CONST.CHECKED);
        this.props.setStatus("two", APP_CONST.OPEN);
    }

    showUncheckedLogin = () => (
        this.props.isLoggedIn? (
            <div className="container">
                <div className="row">
                    <div className="col-md-5">
                        <div className="small py-1">
                            <span className="text-muted">Name</span>
                            <strong className="ml-2">{this.props.customerName}</strong>
                        </div>
                        <button className="btn btn-link p-0" onClick={this.logoutAndSignin}><small>Logout & Sign in to another account</small></button>
                        <button className="btn btn-dark btn-block btn-lg my-3" onClick={this.continueCheckout}><small> CONTINUE CHECKOUT </small></button>
                    </div>
                </div>
                <div className="row">
                    <small className="col-md-12 text-muted"> Please note that upon clicking "Logout" you will lose all items in cart and will be redirected to home page</small>
                </div>
            </div>):(
            <div className="row">
                <div className="col-md-5">
                    <Link to={"./user/login"} className="btn btn-dark btn-block btn-lg my-3"><small> LOGIN TO CHECKOUT </small></Link>
                </div>
                <small className="col-md-12 text-muted"> Please note that upon clicking "Login" your last saved cart items will be added with current cart items</small>
            </div>
        )
    );

    showCheckedLogin = () => (
        <React.Fragment>
            <div className="row">
                <div className="col-md-9 col-sm-9 col-9">
                    {this.getHeaderContent('light')}
                    <span className="text-dark"><strong>&#x2713;</strong></span>
                </div>
                <div className="col">
                    <button className="btn btn-outline-dark float-right" onClick={this.changeDetail}>Change</button>
                </div>
            </div>
            <div className="row">
                <div className="col-md-10 pl-5 ml-2">
                    <small><strong>{this.props.customerName}</strong></small>
                </div>
            </div>
        </React.Fragment>
    );

    render() {
        const {stepOneStatus} = this.props;
        return (
            <Tile
                className="mb-3"
                headerClass ="_primary_bg"
                header={stepOneStatus === APP_CONST.OPEN && this.getHeaderContent('dark')}>
                { stepOneStatus === APP_CONST.CHECKED? this.showCheckedLogin(): this.showUncheckedLogin() }
            </Tile>
        )
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LoginCheck));