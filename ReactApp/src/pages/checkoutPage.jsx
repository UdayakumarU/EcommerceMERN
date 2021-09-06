import { React, Component, connect } from "../library";

import Header  from "../components/misc/header";
import LoginCheck from "../components/checkout/loginCheck";
import DeliveryAddressCheck from "../components/checkout/deliveryAddress/deliveryAddressCheck";
import OrderSummaryCheck from "../components/checkout/orderSummary/orderSummaryCheck";
import PaymentOptionCheck from "../components/checkout/paymentOption/paymentOptionCheck";
import PriceDetail from "../components/priceDetail";

import { getCustomerLoginStatus } from "../redux/customer/customer.selector";
import { getCheckoutItems, getCheckoutStepStatus } from "../redux/checkout/checkout.selector";
import { getCartItems } from '../redux/cart/cart.selector';
import { setCheckoutStepStatus, moveItemsToCheckout, initializeCheckoutSteps, terminateCheckout } from "../redux/checkout/checkout.action";
import { mergeCustomerCart } from "../redux/cart/cart.action";

import APP_CONST from "../APP_CONST";

const mapStateToProps = (state) => {
    return{
        cartItems : getCartItems(state),
        loginCheck : getCustomerLoginStatus(state),
        checkoutItems: getCheckoutItems(state),
        paymentCheck: getCheckoutStepStatus(state, APP_CONST.STEP.FOUR)
    }
};

const mapDispatchToProps = (dispatch) => ({
    initializeCheckout : () => dispatch(initializeCheckoutSteps()),
    moveItemsToCheckout : cartItems => dispatch(moveItemsToCheckout(cartItems)),
    setCheckoutStepStatus : (step, status) => dispatch(setCheckoutStepStatus(step,status)),
    mergeCustomerCart : (checkoutItems) => dispatch(mergeCustomerCart(checkoutItems)),
    terminateCheckout : ()=> dispatch(terminateCheckout())
});

class CheckoutPage extends Component {
    componentDidMount(){
        //Prone to inconsistent checkout state on page refresh
        //need to implement proper onbeforeunload handler
        const { loginCheck, setCheckoutStepStatus, initializeCheckout, moveItemsToCheckout, cartItems } = this.props;
        initializeCheckout();
        moveItemsToCheckout(cartItems);
        setCheckoutStepStatus(APP_CONST.STEP.ONE, loginCheck? APP_CONST.CHECKED: APP_CONST.OPEN);
        setCheckoutStepStatus(APP_CONST.STEP.TWO, loginCheck? APP_CONST.OPEN: false);
    }

    componentWillUnmount(){
        this.props.terminateCheckout();
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