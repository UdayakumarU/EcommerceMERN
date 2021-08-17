import React, { Component } from 'react'

import AddressForm from './addressForm';
import AddressDetails from './addressDetails';

export default class AddressList extends Component {
    constructor(){
        super();
        this.state = { editAddressId: "" }
    }

    setEditAddressId = (id) => {
        this.setState({editAddressId:id});
    }
    
    closeform =() =>{
        this.setState({editAddressId:""});
    }
    
    render() {
        const {addresses} = this.props;
        const {editAddressId} = this.state;
        return (
            addresses.map(address => (
                editAddressId === address._id?(
                    <AddressForm 
                        key={address._id} 
                        address={address}
                        closeform={this.closeform}/>):(
                    <AddressDetails 
                        key={address._id} 
                        address={address}
                        setEditAddressId={this.setEditAddressId}/>
                )
            ))
        )
    }
}
