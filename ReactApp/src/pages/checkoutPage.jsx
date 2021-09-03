import React, { Component } from "react"
import { connect } from "react-redux";

import Header  from "../components/misc/header";
import LoginCheck from "../components/checkout/loginCheck";
import DeliveryAddressCheck from "../components/checkout/deliveryAddress/deliveryAddressCheck";
import OrderSummaryCheck from "../components/checkout/orderSummary/orderSummaryCheck";
import PaymentOptionCheck from "../components/checkout/paymentOption/paymentOptionCheck";
import PriceDetail from "../components/priceDetail";

import { getCustomerLoginStatus } from "../redux/customer/customer.selector";
import { setCheckoutStepStatus } from "../redux/checkout/checkout.action";
import { getCheckoutItems, getCheckoutStepStatus } from "../redux/checkout/checkout.selector";
import { mergeCustomerCart } from "../redux/cart/cart.action";

import APP_CONST from "../APP_CONST";

const mapStateToProps = (state) => {
    return{
        loginCheck : getCustomerLoginStatus(state),
        checkoutItems: getCheckoutItems(state),
        paymentCheck: getCheckoutStepStatus(state, APP_CONST.STEP.FOUR)
    }
};

const mapDispatchToProps = (dispatch) => ({
    setCheckoutStepStatus : (step, status) => dispatch(setCheckoutStepStatus(step,status)),
    mergeCustomerCart : (cartItems) => dispatch(mergeCustomerCart(cartItems))
});

class CheckoutPage extends Component {
    componentDidMount(){
        //Prone to inconsistent checkout state on page refresh
        //since initializeCheckout has moved to PlaceOrder handler
        const {loginCheck, setCheckoutStepStatus} = this.props;
        setCheckoutStepStatus(APP_CONST.STEP.ONE, loginCheck? APP_CONST.CHECKED: APP_CONST.OPEN);
        setCheckoutStepStatus(APP_CONST.STEP.TWO, loginCheck? APP_CONST.OPEN: false);
    }

    componentWillUnmount(){
        if(this.props.paymentCheck !== APP_CONST.CHECKED)
            this.props.mergeCustomerCart(this.props.checkoutItems);
    }

    render() {
        const {checkoutItems} = this.props;
        const checkoutSecionClass = checkoutItems.length? "col-md-8": "offset-2 col-md-8";
        return (
            <React.Fragment>
                <Header hideCart={true} hideLogin={true}/>
                <div className = 'container-fluid'>
                    <div className='row mt-4'>
                        <div className = {checkoutSecionClass}>
                            <LoginCheck/>
                            <DeliveryAddressCheck/>
                            <OrderSummaryCheck/>
                            <PaymentOptionCheck/>
                        </div>
                        {checkoutItems.length > 0 && <div className="col-md-4">
                            <PriceDetail items={checkoutItems}/>
                        </div>}
                    </div> 
                </div>
            </React.Fragment>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutPage);