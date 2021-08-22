import React, { Component } from 'react'
import {connect} from "react-redux";

import { Tile } from "../../../library";
import AddressForm from "./addressForm";
import AddressList from "./addressList";
import { getCustomerLoginToken, getCustomerAddresses, getCheckoutStepStatus, getConfirmedAddressId } from "../../../redux/customer/customer.selector";
import { setCustomerAddresses, setCheckoutStepStatus } from "../../../redux/customer/customer.action";
import { setLoader, setErrorMessage } from "../../../redux/misc/misc.action";

import {getAddressById} from "../../../utils/util";
import * as api from "../../../api/api";
import APP_CONST from '../../../APP_CONST';

const mapStateToProps = (state) => {
    const addresses = getCustomerAddresses(state);
    const addressId = getConfirmedAddressId(state);
    return {
        logintoken : getCustomerLoginToken(state),
        addresses,
        stepTwoStatus: getCheckoutStepStatus(state, "two"),
        confirmedAddress: getAddressById(addresses, addressId)}
}

const mapDispatchToProps = (dispatch) => ({
    setCustomerAddresses : (addresses) => dispatch(setCustomerAddresses(addresses)),
    setLoader : (status) => dispatch(setLoader(status)),
    setErrorMessage : (errors) => dispatch(setErrorMessage(errors)),
    setCheckoutStatus:(step, status) => dispatch(setCheckoutStepStatus(step, status))
});

class DeliveryAddressCheck extends Component { 
    constructor(props){
        super(props);
        this.state = { addAddress : false }
    }

    //yet to check few other scenrio for populating address list
    componentDidMount() {
        const {logintoken, setCustomerAddresses, setLoader, setErrorMessage, stepTwoStatus} = this.props;
        if(stepTwoStatus){
            setLoader(true);
            api.getCustomerAddresses(logintoken).then( response => {
                setCustomerAddresses(response.addresses);
                setLoader(false);
            }, reject => {
                setErrorMessage([reject]);
                setLoader(false);
            })
        }
    }
    
    getHeaderContent = (color) => (
        <React.Fragment>
            <span className={`badge badge-${color} px-2 py-1`}>2</span>
            <span className="text-muted px-3"><strong>DELIVERY ADDRESS</strong></span>
        </React.Fragment>
    );

    changeDetail = () =>{
        this.props.setCheckoutStatus("two", APP_CONST.OPEN);
        this.props.setCheckoutStatus("three", false);
        this.props.setCheckoutStatus("four", false);
    }

    toggleAddressform = () => {
        this.setState({addAddress:!this.state.addAddress})
    }

    showUncheckedDeliveryAddress = () => {
        const { addresses, stepTwoStatus } = this.props;
        const { addAddress } = this.state;
        return (
           stepTwoStatus?(
            <div className="container">
                {addresses.length>0 && <AddressList addresses ={addresses}/>}
                {addAddress ?
                    <AddressForm closeform = {this.toggleAddressform}/>:
                    <Tile 
                        title={<div 
                                className="text-primary _pointer" 
                                onClick={this.toggleAddressform}> 
                                    + Add a new address
                                </div>}
                    /> 
                }
            </div>):
            <div className="row">
                <div className="col-md-9 col-sm-9 col-9">
                    {this.getHeaderContent('light')}
                </div>
            </div>
        );
    }

    showCheckedDeliveryAddress = () => {
        const {confirmedAddress} = this.props;
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
                            <strong>{`${confirmedAddress.receiverName} `}</strong> 
                            <span>{`${confirmedAddress.area}, `}</span>
                            <span>{`${confirmedAddress.city}, `}</span>
                            <span>{`${confirmedAddress.state} - `}</span>
                            <span><strong>{confirmedAddress.pincode}</strong></span>
                        </small>
                    </div>
                </div>
            </React.Fragment>
        );
    }

    render() {
        const {stepTwoStatus} = this.props;
        return (
            <Tile
                className="mb-3"
                headerClass ="_primary_bg"
                header={stepTwoStatus === APP_CONST.OPEN && this.getHeaderContent('dark')}>
                {stepTwoStatus === APP_CONST.CHECKED? this.showCheckedDeliveryAddress(): this.showUncheckedDeliveryAddress()}
            </Tile>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DeliveryAddressCheck);