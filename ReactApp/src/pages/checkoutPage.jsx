import React, { Component } from "react"
import { connect } from "react-redux";

import Header  from "../components/misc/header";
import LoginCheck from "../components/checkout/loginCheck";
import DeliveryAddressCheck from "../components/checkout/deliveryAddress/deliveryAddressCheck";
import OrderSummaryCheck from "../components/checkout/orderSummary/orderSummaryCheck";
import CartPriceDetails from "../components/cart/cartPriceDetail";

import { getCustomerLoginStatus } from "../redux/customer/customer.selector";
import { initializeCheckoutSteps, setCheckoutStepStatus } from "../redux/customer/customer.action";

import APP_CONST from "../APP_CONST";

const mapStateToProps = (state) => {
    return{
        loginCheck : getCustomerLoginStatus(state)
    }
};

const mapDispatchToProps = (dispatch) => ({
    initializeCheckout : () => dispatch(initializeCheckoutSteps()),
    setCheckoutStepStatus : (step, status) => dispatch(setCheckoutStepStatus(step,status))
});

class CheckoutPage extends Component {
    componentDidMount(){
        const {loginCheck, initializeCheckout, setCheckoutStepStatus} = this.props;
        initializeCheckout();
        setCheckoutStepStatus("one", loginCheck? APP_CONST.CHECKED: APP_CONST.OPEN);
        setCheckoutStepStatus("two", loginCheck? APP_CONST.OPEN: false);
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