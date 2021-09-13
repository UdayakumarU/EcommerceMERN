import { React, Component, connect, Tile } from '../../../library';
import { setSelectedAddressId, setConfirmedAddressId, setCheckoutStepStatus } from "../../../redux/checkout/checkout.action";
import APP_CONST from '../../../APP_CONST';

const mapDispatchToProps = (dispatch) => ({
    setSelectedAddressId: (id) => dispatch(setSelectedAddressId(id)),
    setConfirmedAddressId: (id) => dispatch(setConfirmedAddressId(id)),
    setCheckoutStatus: (step, status) => dispatch(setCheckoutStepStatus(step, status))
});

class AddressDetails extends Component {
    getAddressType = (type) =>{
        return type && <span className=" badge badge-secondary mx-2">{ type === 'H'? "HOME": "WORK"}</span>
    }
    
    editAddress = (id) =>{
        this.props.setEditAddressId(id);
    }

    handleSelectedAddress = (id) => {
        this.props.setSelectedAddressId(id);
    }

    handleDeliveryAddress = (id) => {
        this.props.setConfirmedAddressId(id);
        this.props.setCheckoutStatus(APP_CONST.STEP.TWO, APP_CONST.CHECKED);
        this.props.setCheckoutStatus(APP_CONST.STEP.THREE, APP_CONST.OPEN);
    }
    
    render() {
        const { address, selectedAddressId } = this.props;
        const isSelectedAddress = selectedAddressId === address._id;
        const selectClass = isSelectedAddress? "card border-dark": "";
        return (
            <Tile className={`${selectClass} _pointer _hoverable`} onClick={() => this.handleSelectedAddress(address._id)}>
                <div className="row">
                    <div className="col-md-10">
                        <div className="small">
                            <span className="mr-2"><strong>{address.receiverName}</strong></span>
                            {this.getAddressType(address.addressType)}
                            <span className="mx-2"><strong>{address.receiverMobile}</strong></span>
                        </div>
                        <div className="small my-3">
                            <span>{`${address.area}, `}</span>
                            <span>{`${address.city}, `}</span>
                            <span>{`${address.state} - `}</span>
                            <span><strong>{address.pincode}</strong></span>
                        </div>
                    </div>
                    {isSelectedAddress && <div className="col">
                        <button
                            className="btn btn-light text-primary float-right _text_sm_dark"
                            onClick={() => this.editAddress(address._id)}>EDIT</button>
                    </div>}
                </div>
                {isSelectedAddress && <div className="row">
                    <div className="col-lg-4 col-md-6 col-sm-6 col-xs-12">
                        <button 
                            className="btn btn-dark btn-block btn-lg my-3" 
                            onClick={() => this.handleDeliveryAddress(address._id)}>
                                <small> DELIVER HERE </small>
                        </button>    
                    </div>
                </div>}
            </Tile>
        )
    }
}

export default connect(null, mapDispatchToProps)(AddressDetails);