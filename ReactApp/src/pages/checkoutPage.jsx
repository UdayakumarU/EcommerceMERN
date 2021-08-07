import React, { Component } from "react"

import Header  from "../components/misc/header";
import LoginCheck from "../components/checkout/loginCheck";
import CartPriceDetails from "../components/cart/cartPriceDetail";

class CheckoutPage extends Component {
    render() {
        return (
            <React.Fragment>
                <Header hideCart={true} hideLogin={true}/>
                <div className = 'container-fluid'>
                    <div className='row mt-4'>
                        <div className = "col-md-8">
                            <LoginCheck/>
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

export default CheckoutPage;