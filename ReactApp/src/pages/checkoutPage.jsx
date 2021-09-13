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
import { getHomeProducts } from '../redux/product/product.selector';
import { setCheckoutStepStatus, moveItemsToCheckout, initializeCheckoutSteps, terminateCheckout } from "../redux/checkout/checkout.action";
import { mergeCustomerCart } from "../redux/cart/cart.action";

import { beforeUnloadListener, getProductById, parseQuery } from "../utils/util";
import APP_CONST from "../APP_CONST";

const mapStateToProps = (state, props) => {
    const query = parseQuery(props.location.search);
    return{
        cartItems: getCartItems(),
        loginCheck: getCustomerLoginStatus(),
        checkoutItems: getCheckoutItems(),
        paymentCheck: getCheckoutStepStatus(APP_CONST.STEP.FOUR),
        products: getHomeProducts(),
        queriedProductId: query.get(APP_CONST.QUERY.PRODUCT_ID)
    }
};

const mapDispatchToProps = (dispatch) => ({
    initializeCheckout: () => dispatch(initializeCheckoutSteps()),
    moveItemsToCheckout: (cartItems) => dispatch(moveItemsToCheckout(cartItems)),
    setCheckoutStepStatus: (step, status) => dispatch(setCheckoutStepStatus(step,status)),
    mergeCustomerCart: (checkoutItems) => dispatch(mergeCustomerCart(checkoutItems)),
    terminateCheckout: () => dispatch(terminateCheckout())
});

class CheckoutPage extends Component {
    componentDidMount(){
        window.addEventListener('beforeunload', beforeUnloadListener);
        const { loginCheck, setCheckoutStepStatus, initializeCheckout, moveItemsToCheckout, cartItems, products, queriedProductId } = this.props;
        const item = queriedProductId? getProductById(products, queriedProductId): null;
        initializeCheckout();
        moveItemsToCheckout(item? [item]: cartItems);
        setCheckoutStepStatus(APP_CONST.STEP.ONE, loginCheck? APP_CONST.CHECKED: APP_CONST.OPEN);
        setCheckoutStepStatus(APP_CONST.STEP.TWO, loginCheck? APP_CONST.OPEN: false);
    }

    componentWillUnmount(){
        window.removeEventListener('beforeunload', beforeUnloadListener);
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