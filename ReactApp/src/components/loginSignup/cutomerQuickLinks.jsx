import React, { Component } from 'react'
import { connect } from 'react-redux';

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
        cartItems : getCartItems(state),
        customerLoginToken : getCustomerLoginToken(state)
    };
}

const mapDispatchToProps = dispatch =>({
    logoutCustomer : () => dispatch(logoutCustomer()),
    emptyCart : () => dispatch(emptyCart()),
    setLoader : (status) => dispatch(setLoader(status)),
    setErrorMessage : (errors) => dispatch(setErrorMessage(errors))
});

class CutomerQuickLinks extends Component {
    logoutCustomer = () => {
        const {cartItems, customerLoginToken, emptyCart, logoutCustomer, setLoader, setErrorMessage } = this.props;
        const cartProductIds = mapCartProductsToIds(cartItems);
        setLoader(true);
        api.saveCartItems(cartProductIds, customerLoginToken).then( response => {
            response && emptyCart();
            logoutCustomer();
            setLoader(false);
        }, reject => {
            setErrorMessage([reject]);
            setLoader(false);
        });
    }

    render() {
        const {customerName} = this.props;
        return (
            <span className="dropdown">
                <button className="btn dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    {customerName}
                </button>
                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    <span className="btn dropdown-item" onClick={this.logoutCustomer}>Logout</span>
                </div>
            </span>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CutomerQuickLinks);