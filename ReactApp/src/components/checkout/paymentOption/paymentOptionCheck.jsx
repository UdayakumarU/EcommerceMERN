import React, { Component } from 'react';
import {connect} from "react-redux";

import { Tile } from "../../../library";
import { getCheckoutStepStatus } from "../../../redux/checkout/checkout.selector";
import APP_CONST from "../../../APP_CONST";

const mapStateToProps = (state) => {
    return {
        stepFourStatus: getCheckoutStepStatus(state, APP_CONST.STEP.FOUR)
    }
};

class PaymentOptionCheck extends Component {
    getHeaderContent = (color) => (
        <React.Fragment>
            <span className={`badge badge-${color} px-2 py-1`}>4</span>
            <span className="text-muted px-3"><strong>PAYMENT OPTIONS</strong></span>
        </React.Fragment>
    );
    
    showUncheckedPaymentOption = () =>{
        const { stepFourStatus } = this.props;
        return( 
            stepFourStatus?(<div className="row">
                <div className="col-md-6 col-sm-6 col-6">Cash on delivery</div>
                <div className="col">
                    <button className="btn btn-dark btn-lg px-5">
                        <small> CONFIRM ORDER </small>
                    </button> 
                </div>
            </div>):
            <div className="row">
                <div className="col-md-9 col-sm-9 col-9">
                    {this.getHeaderContent('light')}
                </div>
            </div>
        );
    }
    
    showCheckedPaymentOption = () => (<div/>)

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

export default connect(mapStateToProps)(PaymentOptionCheck);