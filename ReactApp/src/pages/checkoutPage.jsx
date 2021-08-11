import React, { Component } from "react"
import { connect } from "react-redux";

import Header  from "../components/misc/header";
import LoginCheck from "../components/checkout/loginCheck";
import DeliveryAddressCheck from "../components/checkout/deliveryAddressCheck";
import CartPriceDetails from "../components/cart/cartPriceDetail";

import { getCustomerLoginStatus } from "../redux/customer/customer.selector";

const mapStateToProps = (state) => {
    return{
        loginCheck : getCustomerLoginStatus(state)
    }
};

class CheckoutPage extends Component {
    render() {
        const {loginCheck} = this.props;
        return (
            <React.Fragment>
                <Header hideCart={true} hideLogin={true}/>
                <div className = 'container-fluid'>
                    <div className='row mt-4'>
                        <div className = "col-md-8">
                            <LoginCheck loginCheck={loginCheck}/>
                            <DeliveryAddressCheck deliveryCheck={false}/>
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

export default connect(mapStateToProps)(CheckoutPage);