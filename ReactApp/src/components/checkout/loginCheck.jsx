import React, { Component } from 'react'
import { connect } from 'react-redux';
import { withRouter } from "react-router";

import {Tile} from "../../library";
import { getCustomerName } from "../../redux/customer/customer.selector";
import { getCustomerLoginToken } from "../../redux/customer/customer.selector";
import { getCartItems } from "../../redux/cart/cart.selector";
import { logoutCustomer } from "../../redux/customer/customer.action";
import { emptyCart } from "../../redux/cart/cart.action";
import { setLoader, setErrorMessage } from "../../redux/misc/misc.action";
import { mapCartProductsToIds } from "../../utils/cartUtils";
import * as api from "../../api/api";

const mapStateToProps = (state) => {
    return {
        customerName : getCustomerName(state),
        customerLoginToken : getCustomerLoginToken(state),
        cartItems : getCartItems(state)
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        logoutCustomer : () => dispatch(logoutCustomer()),
        emptyCart : () => dispatch(emptyCart()),
        setLoader : (status) => dispatch(setLoader(status)),
        setErrorMessage : (errors) => dispatch(setErrorMessage(errors))
    }
};

class LoginCheck extends Component {
    constructor(props){
        super(props);
        this.state = { 
            isChecked : this.props.checked, 
            headerContent : (
                <h6>
                    <span className="badge badge-dark px-2 py-1">1</span>
                    <span className="text-muted px-3">LOGIN</span>
                </h6>
            )
        }
    }

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

    toggleChange = () =>{
        this.setState({isChecked:!this.state.isChecked})
    }

    showUncheckedLogin = () => (
        <div className="container">
            <div className="row">
                <div className="col-md-5">
                    <div className="small py-1">
                        <span className="text-muted">Name</span>
                        <strong className="ml-2">{this.props.customerName}</strong>
                    </div>
                    <button className="btn btn-link p-0" onClick={this.logoutAndSignin}><small>Logout & Sign in to another account</small></button>
                    <button className="btn btn-dark btn-block btn-lg my-3" onClick={this.toggleChange}><small> CONTINUE CHECKOUT </small></button>
                </div>
            </div>
            <div className="row">
                <small className="col-md-12 text-muted"> Please note that upon clicking "Logout" you will lose all items in cart and will be redirected to home page</small>
            </div>
        </div>
    );

    showCheckedLogin = () => (
        <div className="row">
            <div className="col-md-1">
                <span className="badge badge-light px-2 py-1">1</span>
            </div>
            <div className="col-md-9">
                <h6>
                    <span className="text-muted">LOGIN</span>
                    <span className="text-dark ml-2"><strong>&#x2713;</strong></span>
                </h6>
                <small>{this.props.customerName}</small>
            </div>
            <div className="col-md-2">
                <button className="btn btn-outline-dark" onClick={this.toggleChange}>Change</button>
            </div>
        </div>
    );

    render() {
        const {isChecked, headerContent} = this.state;
        return (
            <Tile 
                className="mb-3"
                headerClass ="_primary_bg"
                header={!isChecked && headerContent}>
                {isChecked? this.showCheckedLogin(): this.showUncheckedLogin()}
            </Tile>
        )
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LoginCheck));