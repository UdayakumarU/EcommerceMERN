import React, { Component } from 'react'
import {connect} from "react-redux";

import { Tile } from "../../../library";
import AddAddressForm from "./addAddressForm";
import AddressList from "./addressList";
import { getCustomerLoginToken, getCustomerAddresses } from "../../../redux/customer/customer.selector";
import { setCustomerAddresses } from "../../../redux/customer/customer.action";
import { setLoader, setErrorMessage } from "../../../redux/misc/misc.action";

import * as api from "../../../api/api";

const mapStateToProps = (state) => {
    return {
        logintoken : getCustomerLoginToken(state),
        addresses : getCustomerAddresses(state)}
}

const mapDispatchToProps = (dispatch) => ({
    setCustomerAddresses : (addresses) => dispatch(setCustomerAddresses(addresses)),
    setLoader : (status) => dispatch(setLoader(status)),
    setErrorMessage : (errors) => dispatch(setErrorMessage(errors))
});

class DeliveryAddressCheck extends Component {
    constructor(props){
        super(props);
        this.state = { 
            isChecked : this.props.deliveryCheck, 
            addAddress : false
        }
    }
    
    componentDidMount()  {
        const {logintoken, addresses, setCustomerAddresses, setLoader, setErrorMessage} = this.props;
        setLoader(true);
        api.getCustomerAddresses(logintoken).then( response => {
            setCustomerAddresses(response.addresses);
            setLoader(false);
            this.setState({ isChecked : (addresses.length > 0) });
        }, reject => {
            setErrorMessage([reject]);
            setLoader(false);
        })
    }
    
    getHeaderContent = (color) => (
        <React.Fragment>
            <span className={`badge badge-${color} px-2 py-1`}>2</span>
            <span className="text-muted px-3"><strong>DELIVERY ADDRESS</strong></span>
        </React.Fragment>
    );

    toggleChange = () =>{
        this.setState({isChecked:!this.state.isChecked})
    }

    toggleAddAddressform = () => {
        this.setState({addAddress:!this.state.addAddress})
    }

    showUncheckedDeliveryAddress = () => {
        const { addresses } = this.props;
        const { addAddress } = this.state;
        return (
            <div className="container">
                {addresses.length>0 && <AddressList addresses ={addresses}/>}
                {addAddress ?
                    <AddAddressForm closeform = {this.toggleAddAddressform}/>:
                    <Tile 
                        title={<div 
                                className="text-primary _pointer" 
                                onClick={this.toggleAddAddressform}> 
                                    + Add a new address
                                </div>}/> 
                }
            </div>
        );
    }

    showCheckedDeliveryAddress = () => (
        <React.Fragment>
            <div className="row">
                <div className="col-md-9 col-sm-9 col-9">
                    {this.getHeaderContent('light')}
                    <span className="text-dark"><strong>&#x2713;</strong></span>
                </div>
                <div className="col">
                    <button className="btn btn-outline-dark float-right" onClick={this.toggleChange}>Change</button>
                </div>
            </div>
            <div className="row">
                <div className="col-md-10 pl-5 ml-2">
                    <small><strong>Selected Address comes here</strong></small>
                </div>
            </div>
        </React.Fragment>
    );

    render() {
        const {isChecked} = this.state;
        return (
            <Tile
                className="mb-3"
                headerClass ="_primary_bg"
                header={!isChecked && this.getHeaderContent('dark')}>
                {isChecked? this.showCheckedDeliveryAddress(): this.showUncheckedDeliveryAddress()}
            </Tile>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DeliveryAddressCheck);