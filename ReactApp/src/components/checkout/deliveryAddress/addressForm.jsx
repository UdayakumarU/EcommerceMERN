import { React, Component, connect, Tile, Field } from "../../../library";

import { getCustomerLoginToken } from "../../../redux/customer/customer.selector";
import { setLoader, setErrorMessage } from "../../../redux/misc/misc.action";
import { setCustomerAddresses } from "../../../redux/customer/customer.action";
import { setConfirmedAddressId, setCheckoutStepStatus } from "../../../redux/checkout/checkout.action";
import { validateName, validateMobileNumber, validatePincode, validateText } from "../../../utils/loginUtils";

import APP_CONST from "../../../APP_CONST";
import * as api from "../../../api/api";

const mapStateToProps = () => ({
    loginToken: getCustomerLoginToken()
});

const mapDispatchToProps = (dispatch) => ({
    setLoader: (status) => dispatch(setLoader(status)),
    setErrorMessage: (error) => dispatch(setErrorMessage(error)),
    setCustomerAddresses: (addresses) => dispatch(setCustomerAddresses(addresses)),
    setConfirmedAddressId: (addressId) => dispatch(setConfirmedAddressId(addressId)),
    setCheckoutStepStatus: (step, status) => dispatch(setCheckoutStepStatus(step, status))
});

const INITIAL_STATE = {
    receiverName: "",
    receiverMobile: "",
    area: "",
    pincode:"",
    city:"",
    state:"",
    landmark:"",
    addressType:"",
    error :{
        receiverName:"",
        receiverMobile:"",
        area:"",
        pincode:"",
        city:"",
        state:"",
        landmark:"",
        addressType:""
    }
};

class AddressForm extends Component {
    constructor() {
        super();
        this.state = INITIAL_STATE;
    }
    
    componentDidMount(){
        const {address} = this.props;
        if(address){
            this.setState({...address})
        }
    }

    validateForm = () => {
        const error = {};
        error.receiverName = validateName(this.state.receiverName);
        error.receiverMobile = validateMobileNumber(this.state.receiverMobile);
        error.pincode = validatePincode(this.state.pincode);
        error.area = validateText(this.state.area, "Please enter valid area");
        error.city = validateText(this.state.city, "Please enter valid city");
        error.state = validateText(this.state.state, "Please enter valid State");
        this.setState({error});
        return !(error.receiverName||error.receiverMobile||error.pincode||error.area||error.city||error.state);
    }
    
    setAsDeliveryAddress = addressId => {
        // how to set the deliveryaddress for a newly added address which doesn't have _id, causing extra to completes
        if(addressId){ 
            this.props.setConfirmedAddressId(addressId);
        }
        this.props.closeform();
        if(addressId){
            this.props.setCheckoutStepStatus(APP_CONST.STEP.TWO, APP_CONST.CHECKED);
            this.props.setCheckoutStepStatus(APP_CONST.STEP.THREE, APP_CONST.OPEN);
        }
    }

    saveAndDeliver = event => {
        const {loginToken, setLoader, setErrorMessage, setCustomerAddresses, address} = this.props; 
        const {error, ...deliveryAddress} = this.state;
        const serviceApi = address? api.updateCustomerAddress: api.addCustomerAddress;
        event.preventDefault();
        if(this.validateForm()){
            setLoader(true);
            serviceApi(deliveryAddress, loginToken).then( response => {
                setCustomerAddresses(response.addresses);
                this.setAsDeliveryAddress(deliveryAddress._id);
                setLoader(false);
            }, reject =>{
                setErrorMessage([reject]);
                setLoader(false);
            })
        }
    }

    handleChange = event => {
        const { name, value } = event.target;
        const error = {...this.state.error};
        error[name] = "";
        this.setState({ [name]: value });
        this.setState({ error });
    };

    render() {
        const {closeform, address} = this.props;
        const {receiverName, receiverMobile, area, pincode, city, state, landmark, addressType, error} = this.state;
        const title = address?"EDIT ADDRESS":"ADD A NEW ADDRESS";
        return (
            <Tile title= {<h6 className="text-muted">{title}</h6>}>
                <div className="form-row">
                    <div className="form-group col-md-6">
                        <Field
                            id="receiver-name" 
                            inputType="TEXTBOX"
                            name="receiverName"
                            value = {receiverName}
                            errorlabel = {error.receiverName}
                            onChange = {this.handleChange}
                            label = "Name"/>
                    </div>
                    <div className="form-group col-md-6">
                        <Field
                            id="receiver-mobile" 
                            inputType="NUMBER"
                            maxLength="10"
                            name="receiverMobile"
                            value = {receiverMobile}
                            errorlabel = {error.receiverMobile}
                            onChange = {this.handleChange}
                            label = "10-digit mobile number"/>
                    </div>
                </div>
                <div className="form-group">
                    <Field
                        id="area"
                        inputType="TEXTBOX"
                        name="area"
                        value={area}
                        errorlabel = {error.area}
                        onChange={this.handleChange}
                        label="Address (Area and Street)" />
                </div>
                <div className="form-row">
                    <div className="form-group col-md-6">
                        <Field
                            id="pincode" 
                            inputType="NUMBER"
                            maxLength="6"
                            name="pincode"
                            value = {pincode}
                            errorlabel = {error.pincode}
                            onChange = {this.handleChange}
                            label = "Pincode"/>
                    </div>
                    <div className="form-group col-md-6">
                        <Field
                            id="city" 
                            inputType="TEXTBOX"
                            name="city"
                            value = {city}
                            errorlabel = {error.city}
                            onChange = {this.handleChange}
                            label = "City/District/Town"/>
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group col-md-6">
                        <Field
                            id="state" 
                            inputType="TEXTBOX"
                            name="state"
                            value = {state}
                            errorlabel = {error.state}
                            onChange = {this.handleChange}
                            label = "State"/>
                    </div>
                    <div className="form-group col-md-6">
                        <Field
                            id="landmark" 
                            inputType="TEXTBOX"
                            name="landmark"
                            value = {landmark}
                            onChange = {this.handleChange}
                            label = "Landmark (Optional)"/>
                    </div>
                </div>
                <div className="form-group">
                    <div><label className="_text_sm_dark">Address Type</label></div>
                    <Field
                        id="address-type-h"
                        inputType="RADIO"
                        name="addressType"
                        value="H"
                        checked={addressType === 'H'}
                        onChange={this.handleChange}
                        label="Home (All day delivery)" />
                    <Field
                        id="address-type-w"
                        inputType="RADIO"
                        name="addressType"
                        value="W"
                        checked={addressType === 'W'}
                        onChange={this.handleChange}
                        label="Work (Delivery between 10AM - 5PM)" />
                </div>
                <div className="row py-3">
                    <div className="col-md-5">
                        <button 
                            className="btn btn-dark btn-block btn-lg" 
                            onClick={this.saveAndDeliver}>
                                <small>SAVE AND DELIVER HERE</small>
                        </button>
                    </div>
                    <div className="col-md-2">
                        <button 
                            className="btn btn-light btn-lg" 
                            onClick={closeform}>
                                <small>CANCEL</small>
                        </button>
                    </div>
                </div>
            </Tile>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddressForm);