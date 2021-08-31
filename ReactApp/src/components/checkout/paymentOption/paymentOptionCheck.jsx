import React, { Component } from 'react';
import {connect} from "react-redux";

import { Tile } from "../../../library";
import { getCheckoutStepStatus } from "../../../redux/checkout/checkout.selector";
import { setCheckoutStepStatus } from "../../../redux/checkout/checkout.action";
import APP_CONST from "../../../APP_CONST";

const mapStateToProps = (state) => {
    return {
        stepFourStatus: getCheckoutStepStatus(state, APP_CONST.STEP.FOUR)
    }
};

const mapDispatchToProps = (dispatch) => ({
    setCheckoutStatus:(step, status) => dispatch(setCheckoutStepStatus(step, status))
});

class PaymentOptionCheck extends Component {
    getHeaderContent = (color) => (
        <React.Fragment>
            <span className={`badge badge-${color} px-2 py-1`}>4</span>
            <span className="text-muted px-3"><strong>PAYMENT OPTIONS</strong></span>
        </React.Fragment>
    );
    
    confirmOrder = () =>{
        this.props.setCheckoutStatus(APP_CONST.STEP.FOUR, APP_CONST.CHECKED);
        //redirect to order tracking page
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

export default connect(mapStateToProps, mapDispatchToProps)(PaymentOptionCheck);