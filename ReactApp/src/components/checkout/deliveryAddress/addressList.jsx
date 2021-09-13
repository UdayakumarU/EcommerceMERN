import { React, Component, connect } from "../../../library";

import AddressForm from './addressForm';
import AddressDetails from './addressDetails';

import { getSelectedAddressId } from "../../../redux/checkout/checkout.selector";

const mapStateToProps = () => ({
    selectedAddressId: getSelectedAddressId()
});

class AddressList extends Component {
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
        const {addresses, selectedAddressId} = this.props;
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
                        selectedAddressId={selectedAddressId}
                        setEditAddressId={this.setEditAddressId}/>
                )
            ))
        )
    }
}

export default connect(mapStateToProps)(AddressList);