import { React, Component, connect, Tile } from "../../../library";

import AddressForm from "./addressForm";
import AddressList from "./addressList";

import { getCustomerLoginToken, getCustomerAddresses } from "../../../redux/customer/customer.selector";
import { getCheckoutStepStatus, getConfirmedAddressId, getSelectedAddressId } from "../../../redux/checkout/checkout.selector";
import { setCustomerAddresses } from "../../../redux/customer/customer.action";
import { setCheckoutStepStatus, setSelectedAddressId } from "../../../redux/checkout/checkout.action";
import { setLoader, setErrorMessage } from "../../../redux/misc/misc.action";

import { getAddressById } from "../../../utils/util";
import APP_CONST from '../../../APP_CONST';
import * as api from "../../../api/api";

const mapStateToProps = () => {
    const addresses = getCustomerAddresses();
    const addressId = getConfirmedAddressId();
    return {
        logintoken: getCustomerLoginToken(),
        addresses,
        stepTwoStatus: getCheckoutStepStatus(APP_CONST.STEP.TWO),
        confirmedAddress: getAddressById(addresses, addressId),
        selectedAddress: getSelectedAddressId()}
}

const mapDispatchToProps = (dispatch) => ({
    setCustomerAddresses: (addresses) => dispatch(setCustomerAddresses(addresses)),
    setLoader: (status) => dispatch(setLoader(status)),
    setErrorMessage: (errors) => dispatch(setErrorMessage(errors)),
    setCheckoutStatus: (step, status) => dispatch(setCheckoutStepStatus(step, status)),
    setSelectedAddressId: (id) => dispatch(setSelectedAddressId(id))
});

class DeliveryAddressCheck extends Component { 
    constructor(props){
        super(props);
        this.state = { addAddress : false }
    }

    componentDidUpdate(prevProps) {
        const {logintoken, setCustomerAddresses, setLoader, setErrorMessage, stepTwoStatus} = this.props;
        if(prevProps.stepTwoStatus === false && stepTwoStatus === APP_CONST.OPEN ){
            setLoader(true);
            api.getCustomerAddresses(logintoken).then( response => {
                setCustomerAddresses(response.addresses);
                this.setDefaultSelectedAddress(response.addresses);
                setLoader(false);
            }, reject => {
                setErrorMessage([reject]);
                setLoader(false);
            })
        }
    }

    setDefaultSelectedAddress = (addresses) =>{
        const {selectedAddress, setSelectedAddressId} = this.props;
        if(!selectedAddress && addresses.length > 0)
            setSelectedAddressId(addresses[0]._id);
    }
    
    getHeaderContent = (color) => (
        <React.Fragment>
            <span className={`badge badge-${color} px-2 py-1`}>2</span>
            <span className="text-muted px-3"><strong>DELIVERY ADDRESS</strong></span>
        </React.Fragment>
    );

    changeDetail = () =>{
        this.props.setCheckoutStatus(APP_CONST.STEP.TWO, APP_CONST.OPEN);
        this.props.setCheckoutStatus(APP_CONST.STEP.THREE, false);
        this.props.setCheckoutStatus(APP_CONST.STEP.FOUR, false);
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