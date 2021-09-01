import React, { Component } from 'react';
import {connect} from "react-redux";

import { Tile } from "../../../library";
import ItemList from '../../itemList';

import { getCheckoutStepStatus } from "../../../redux/checkout/checkout.selector";
import { getCheckoutItems } from "../../../redux/checkout/checkout.selector";
import { setCheckoutStepStatus, removeItemFromCheckout } from "../../../redux/checkout/checkout.action";

import APP_CONST from "../../../APP_CONST";

const mapStateToProps = (state) => {
    return {
        stepThreeStatus: getCheckoutStepStatus(state, APP_CONST.STEP.THREE),
        checkoutItems: getCheckoutItems(state) 
    }
};

const mapDispatchToProps = (dispatch) => ({
    removeItemFromCheckout: (productId)=> dispatch(removeItemFromCheckout(productId)),
    setCheckoutStatus:(step, status) => dispatch(setCheckoutStepStatus(step, status)),
});

class OrderSummaryCheck extends Component {
    changeDetail = () =>{
        this.props.setCheckoutStatus(APP_CONST.STEP.THREE, APP_CONST.OPEN);
        this.props.setCheckoutStatus(APP_CONST.STEP.FOUR, false);
    }

    getHeaderContent = (color) => (
        <React.Fragment>
            <span className={`badge badge-${color} px-2 py-1`}>3</span>
            <span className="text-muted px-3"><strong>ORDER SUMMARY</strong></span>
        </React.Fragment>
    );

    confirmCheckoutItem = () =>{
        this.props.setCheckoutStatus(APP_CONST.STEP.THREE, APP_CONST.CHECKED);
        this.props.setCheckoutStatus(APP_CONST.STEP.FOUR, APP_CONST.OPEN);
    }
    
    removeItemfromCheckout = (productId) => {
        this.props.removeItemFromCheckout(productId);
    }

    showUncheckedOrderSummary = () =>{
        const { stepThreeStatus, checkoutItems } = this.props;
        return( 
            stepThreeStatus?(
                <React.Fragment>
                    <ItemList items={checkoutItems} handleRemoveItem= {this.removeItemfromCheckout}/>
                    <Tile>
                        <div className="float-right">
                            <button 
                                className="btn btn-dark btn-lg px-5" 
                                onClick={this.confirmCheckoutItem}>
                                    <small> CONTINUE </small>
                            </button>    
                        </div>
                    </Tile>
                </React.Fragment>
            ):
            <div className="row">
                <div className="col-md-9 col-sm-9 col-9">
                    {this.getHeaderContent('light')}
                </div>
            </div>
        );
    }
    
    showCheckedOrderSummary = () =>{
        const {checkoutItems} = this.props;
        const checkedItem = `${checkoutItems.length} item${checkoutItems.length>1? 's': ""}`
        return( 
            <React.Fragment>
                <div className="row">
                    <div className="col-md-9 col-sm-9 col-9">
                        {this.getHeaderContent('light')}
                        <span className="text-dark"><strong>&#x2713;</strong></span>
                    </div>
                    <div className="col">
                        <button className="btn btn-outline-dark float-right" onClick={this.changeDetail}>Change</button>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-10 pl-5 ml-2">
                        <small>
                            <strong>{ checkedItem }</strong> 
                        </small>
                    </div>
                </div>
            </React.Fragment>
        )
    }

    render() {
        const {stepThreeStatus} = this.props;
        return (
            <Tile
                className="mb-3"
                headerClass ="_primary_bg"
                header={stepThreeStatus === APP_CONST.OPEN && this.getHeaderContent('dark')}>
                {stepThreeStatus === APP_CONST.CHECKED? this.showCheckedOrderSummary(): this.showUncheckedOrderSummary()}
            </Tile>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderSummaryCheck);