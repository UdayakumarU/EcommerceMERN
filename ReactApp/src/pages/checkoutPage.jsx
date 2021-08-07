import React, { Component } from "react"
import { connect } from "react-redux";

import Header  from "../components/misc/header";
import LoginCheck from "../components/checkout/loginCheck";
import CartPriceDetails from "../components/cart/cartPriceDetail";

import { getCustomerLoginStatus } from "../redux/customer/customer.selector";

const mapStateToProps = (state) => {
    return{
        loginChecked : getCustomerLoginStatus(state)
    }
};

class CheckoutPage extends Component {
    render() {
        const {loginChecked} = this.props;
        return (
            <React.Fragment>
                <Header hideCart={true} hideLogin={true}/>
                <div className = 'container-fluid'>
                    <div className='row mt-4'>
                        <div className = "col-md-8">
                            <LoginCheck checked={loginChecked}/>
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