import { React, Component, connect, withRouter, Tile} from "../../library";

import { getCustomerLoginStatus, getCustomerName } from "../../redux/customer/customer.selector";
import { getCustomerLoginToken } from "../../redux/customer/customer.selector";
import { getCartItems } from "../../redux/cart/cart.selector";
import { getCheckoutStepStatus } from "../../redux/checkout/checkout.selector";
import { logoutCustomer } from "../../redux/customer/customer.action";
import { setCheckoutStepStatus } from "../../redux/checkout/checkout.action";
import { emptyCart } from "../../redux/cart/cart.action";
import { setLoader, setErrorMessage, setLoginFromCheckout } from "../../redux/misc/misc.action";

import { mapCartProductsToIds } from "../../utils/cartUtils";
import  APP_CONST from "../../APP_CONST";
import * as api from "../../api/api";

const mapStateToProps = () => ({
    customerName: getCustomerName(),
    customerLoginToken: getCustomerLoginToken(),
    cartItems: getCartItems(),
    isLoggedIn: getCustomerLoginStatus(),
    stepOneStatus: getCheckoutStepStatus(APP_CONST.STEP.ONE)
});

const mapDispatchToProps = (dispatch) => ({
    logoutCustomer: () => dispatch(logoutCustomer()),
    emptyCart: () => dispatch(emptyCart()),
    setLoader: (status) => dispatch(setLoader(status)),
    setLoginFromCheckout: () => dispatch(setLoginFromCheckout(true)),
    setErrorMessage: (errors) => dispatch(setErrorMessage(errors)),
    setCheckoutStatus: (step, status) => dispatch(setCheckoutStepStatus(step, status))
});

class LoginCheck extends Component {
    getHeaderContent = (color) => (
        <React.Fragment>
            <span className={`badge badge-${color}`}>1</span>
            <span className="text-muted px-1"><strong>LOGIN</strong></span>
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
        this.props.setCheckoutStatus(APP_CONST.STEP.ONE, APP_CONST.OPEN);
        this.props.setCheckoutStatus(APP_CONST.STEP.TWO, false);
        this.props.setCheckoutStatus(APP_CONST.STEP.THREE, false);
        this.props.setCheckoutStatus(APP_CONST.STEP.FOUR, false);
    }

    continueCheckout = () =>{
        this.props.setCheckoutStatus(APP_CONST.STEP.ONE, APP_CONST.CHECKED);
        this.props.setCheckoutStatus(APP_CONST.STEP.TWO, APP_CONST.OPEN);
    }

    handleLoginToCheckout = () =>{
        this.props.setLoginFromCheckout();
        this.props.history.push('/user/login');
    }
    
    showUncheckedLogin = () => (
        this.props.isLoggedIn? (
            <div className="container">
                <div className="row">
                    <div className="col-md-5 col-sm-6">
                        <div className="small py-1">
                            <span className="text-muted">Name</span>
                            <strong className="ml-2">{this.props.customerName}</strong>
                        </div>
                        <button className="btn btn-link p-0" onClick={this.logoutAndSignin}><small>Logout & Sign in to another account</small></button>
                        <button className="btn btn-dark btn-block my-3 px-0" onClick={this.continueCheckout}><small> CONTINUE CHECKOUT </small></button>
                    </div>
                </div>
                <div className="row">
                    <small className="col-md-12 text-muted"> Please note that upon clicking "Logout" you will lose all items in cart and will be redirected to home page</small>
                </div>
            </div>):(
            <div className="row">
                <div className="col-md-5">
                    <button onClick={this.handleLoginToCheckout} className="btn btn-dark btn-block my-3 px-0"><small> LOGIN TO CHECKOUT </small></button>
                </div>
                <small className="col-md-12 text-muted"> Please note that upon clicking "Login" your last saved cart items will be added with current cart items</small>
            </div>
        )
    );

    showCheckedLogin = () => (
        <React.Fragment>
            <div className="row">
                <div className="col-md-9 col-sm-9 col-8">
                    {this.getHeaderContent('light')}
                    <span className="text-dark"><strong>&#x2713;</strong></span>
                    <div className="col pl-3 ml-1">
                        <small><strong>{this.props.customerName}</strong></small>
                    </div>
                </div>
                <div className="col-sm-3 col-sm-3 col-4 pr-1 pl-0">
                    <button className="btn btn-outline-dark btn-block px-0" onClick={this.changeDetail}>Change</button>
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