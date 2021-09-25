import { React, Component, connect, Tile, withRouter } from "../../../library";

import { getCheckoutStepStatus } from "../../../redux/checkout/checkout.selector";
import { getCustomerLoginToken } from "../../../redux/customer/customer.selector";
import { getCartItems } from "../../../redux/cart/cart.selector";
import { setCheckoutStepStatus } from "../../../redux/checkout/checkout.action";
import { cleanCartAndAddItems } from "../../../redux/cart/cart.action";
import { setLoader, setErrorMessage, setSuccessMessage } from "../../../redux/misc/misc.action";
import { prepareOrderDetails } from "../../../utils/util";
import { removeSelectedProducts } from "../../../utils/cartUtils";

import APP_CONST from "../../../APP_CONST";
import * as api from "../../../api/api";

const mapStateToProps = () => ({
    stepFourStatus: getCheckoutStepStatus(APP_CONST.STEP.FOUR),
    loginToken: getCustomerLoginToken(),
    cartItems: getCartItems()
});

const mapDispatchToProps = (dispatch) => ({
    setCheckoutStatus: (step, status) => dispatch(setCheckoutStepStatus(step, status)),
    setLoader: (status) => dispatch(setLoader(status)),
    setErrorMessage: (error) => dispatch(setErrorMessage(error)),
    setSuccessMessage: (success) => dispatch(setSuccessMessage(success)),
    cleanCartAndAddItems: (items) => dispatch(cleanCartAndAddItems(items))
});

class PaymentOptionCheck extends Component {
    getHeaderContent = (color) => (
        <React.Fragment>
            <span className={`badge badge-${color} px-2 py-1`}>4</span>
            <span className="text-muted px-3"><strong>PAYMENT OPTIONS</strong></span>
        </React.Fragment>
    );
    
    confirmOrder = () =>{
        const { loginToken, setLoader, setErrorMessage, setSuccessMessage, 
                setCheckoutStatus, cartItems, history, cleanCartAndAddItems } = this.props; 
        const orderDetails = prepareOrderDetails();
        setCheckoutStatus(APP_CONST.STEP.FOUR, APP_CONST.CHECKED);
        setLoader(true);
        api.placeOrder(orderDetails, loginToken).then( response => {
            setSuccessMessage([response.message]);
            cleanCartAndAddItems(removeSelectedProducts(response.orderedProducts, cartItems));
            setLoader(false);
            history.push("/orders"); //redirect to order tracking page
        }, reject => {
            setErrorMessage([reject]);
            setLoader(false);
        })
    }

    showUncheckedPaymentOption = () =>{
        const { stepFourStatus } = this.props;
        return( 
            stepFourStatus?(<Tile>
                <div className="row mb-3">
                    <div className="col">Cash on delivery</div>
                </div>
                <div className="row">
                    <div className="col">
                        <button 
                            className="btn btn-dark btn-lg px-5"
                            onClick={this.confirmOrder}>
                                <small> CONFIRM ORDER </small>
                        </button> 
                    </div>
                </div>
            </Tile>):
            <div className="row">
                <div className="col-md-9 col-sm-9 col-9">
                    {this.getHeaderContent('light')}
                </div>
            </div>
        );
    }
    
    showCheckedPaymentOption = () => (
        <div className="row">
            <div className="col-md-9 col-sm-9 col-9">
                {this.getHeaderContent('light')}
                <span className="text-dark"><strong>&#x2713;</strong></span>
            </div>
        </div>
    )

    render() {
        const {stepFourStatus} = this.props;
        return (
            <Tile
                className="mb-3"
                headerClass ="_primary_bg"
                header={stepFourStatus === APP_CONST.OPEN && this.getHeaderContent('dark')}>
                {stepFourStatus === APP_CONST.CHECKED? this.showCheckedPaymentOption(): this.showUncheckedPaymentOption()}
            </Tile>
        )
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PaymentOptionCheck));