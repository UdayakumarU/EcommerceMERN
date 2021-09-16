import { React, Component, connect, withRouter } from "../../library";

import { getCustomerName } from "../../redux/customer/customer.selector";
import { getCustomerLoginToken } from "../../redux/customer/customer.selector";
import { getCartItems } from "../../redux/cart/cart.selector";
import { logoutCustomer } from "../../redux/customer/customer.action";
import { emptyCart } from "../../redux/cart/cart.action";
import { setLoader, setErrorMessage } from "../../redux/misc/misc.action";
import { mapCartProductsToIds } from "../../utils/cartUtils";

import * as api from "../../api/api";

const mapStateToProps = () => ({
    customerName: getCustomerName(),
    cartItems: getCartItems(),
    customerLoginToken: getCustomerLoginToken()
});

const mapDispatchToProps = dispatch => ({
    logoutCustomer: () => dispatch(logoutCustomer()),
    emptyCart: () => dispatch(emptyCart()),
    setLoader: (status) => dispatch(setLoader(status)),
    setErrorMessage: (errors) => dispatch(setErrorMessage(errors))
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
    
    navigateToOrders = () =>{
        this.props.history.push("/orders");
    }

    render() {
        const {customerName} = this.props;
        return (
            <span className="_dropdown py-3 btn">
                <div className="_dropdown_link py-1"> {customerName} </div>
                <div className="_dropdown_menu mt-3">
                    <div className="_dropdown_item _line_at_end" onClick={this.logoutCustomer}>Logout</div>
                    <div className="_dropdown_item" onClick={this.navigateToOrders}>Orders</div>
                </div>
            </span>
        )
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CutomerQuickLinks));