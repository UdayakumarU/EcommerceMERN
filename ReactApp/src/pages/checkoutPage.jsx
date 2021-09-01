import React, { Component } from "react"
import { connect } from "react-redux";

import Header  from "../components/misc/header";
import LoginCheck from "../components/checkout/loginCheck";
import DeliveryAddressCheck from "../components/checkout/deliveryAddress/deliveryAddressCheck";
import OrderSummaryCheck from "../components/checkout/orderSummary/orderSummaryCheck";
import PaymentOptionCheck from "../components/checkout/paymentOption/paymentOptionCheck";
import CartPriceDetails from "../components/cart/cartPriceDetail";

import { getCustomerLoginStatus } from "../redux/customer/customer.selector";
import { initializeCheckoutSteps, setCheckoutStepStatus } from "../redux/checkout/checkout.action";
import { getCheckoutItems, getCheckoutStepStatus } from "../redux/checkout/checkout.selector";
import { mergeCustomerCart } from "../redux/cart/cart.action";

import APP_CONST from "../APP_CONST";

const mapStateToProps = (state) => {
    return{
        loginCheck : getCustomerLoginStatus(state),
        checkoutItems: getCheckoutItems(state),
        isPaymentCompleted: getCheckoutStepStatus(state, APP_CONST.STEP.FOUR)
    }
};

const mapDispatchToProps = (dispatch) => ({
    initializeCheckout : () => dispatch(initializeCheckoutSteps()),
    setCheckoutStepStatus : (step, status) => dispatch(setCheckoutStepStatus(step,status)),
    mergeCustomerCart : (cartItems) => dispatch(mergeCustomerCart(cartItems))
});

class CheckoutPage extends Component {
    componentDidMount(){
        const {loginCheck, initializeCheckout, setCheckoutStepStatus} = this.props;
        initializeCheckout();
        setCheckoutStepStatus(APP_CONST.STEP.ONE, loginCheck? APP_CONST.CHECKED: APP_CONST.OPEN);
        setCheckoutStepStatus(APP_CONST.STEP.TWO, loginCheck? APP_CONST.OPEN: false);
    }

    componentWillUnmount(){
        if(!this.props.isPaymentCompleted)
            this.props.mergeCustomerCart(this.props.checkoutItems);
    }

    render() {
        return (
            <React.Fragment>
                <Header hideCart={true} hideLogin={true}/>
                <div className = 'container-fluid'>
                    <div className='row mt-4'>
                        <div className = "col-md-8">
                            <LoginCheck/>
                            <DeliveryAddressCheck/>
                            <OrderSummaryCheck/>
                            <PaymentOptionCheck/>
                        </div>
                        <div className="col-md-4">
                            <CartPriceDetails/>
                        </div>
                    </div> 
                </div>
            </React.Fragment>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutPage);