import React, { Component } from 'react';

import { Tile } from '../../../library';

export default class AddressDetails extends Component {
    getAddressType = (type) =>{
        return type && <span className=" badge badge-secondary mx-2">{ type === 'H'? "HOME": "WORK"}</span>
    }
    
    editAddress = (id) =>{
        this.props.setEditAddressId(id);
    }

    render() {
        const { address } = this.props;
        return (
            <Tile>
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
                    <div className="col">
                        <button
                            className="btn btn-light text-primary float-right _text_sm_dark"
                            onClick={() => this.editAddress(address._id)}>EDIT</button>
                    </div>
                </div>
            </Tile>
        )
    }
}
