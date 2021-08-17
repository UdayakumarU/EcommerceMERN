import React, { Component } from 'react'
import { connect } from 'react-redux';

import { Tile, Field } from "../../../library";
import { setLoader, setErrorMessage } from "../../../redux/misc/misc.action";
import { setCustomerAddresses } from "../../../redux/customer/customer.action";
import { getCustomerLoginToken } from "../../../redux/customer/customer.selector";
import { validateName, validateMobileNumber, validatePincode, validateText } from "../../../utils/loginUtils";
import * as api from "../../../api/api";

const mapStateToProps = (state) =>{
    const loginToken = getCustomerLoginToken(state);
    return {loginToken}
}

const mapDispatchToProps= (dispatch) =>({
    setLoader : (status) => dispatch(setLoader(status)),
    setErrorMessage : (error) => dispatch(setErrorMessage(error)),
    setCustomerAddresses : (addresses) => dispatch(setCustomerAddresses(addresses))
})

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

    saveAndDeliver = event => {
        const {closeform, loginToken, setLoader, setErrorMessage, setCustomerAddresses} = this.props; 
        const {error, ...deliveryAddress} = this.state;
        event.preventDefault();
        if(this.validateForm()){
            setLoader(true);
            api.addCustomerAddress(deliveryAddress, loginToken).then( response => {
                setCustomerAddresses(response.addresses);
                closeform();
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
        const {closeform} = this.props;
        const {receiverName, receiverMobile, area, pincode, city, state, landmark, error} = this.state;
        return (
            <Tile title= {<h6 className="text-muted">ADD A NEW ADDRESS</h6>}>
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
                        onChange={this.handleChange}
                        label="Home (All day delivery)" />
                    <Field
                        id="address-type-w"
                        inputType="RADIO"
                        name="addressType"
                        value="W"
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