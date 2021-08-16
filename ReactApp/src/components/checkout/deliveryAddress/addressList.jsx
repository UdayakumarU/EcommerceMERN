import React, { Component } from 'react'

import { Tile } from '../../../library';

export default class AddressList extends Component {
    getAddressType = (type) =>{
        return type && <span className=" badge badge-secondary mx-2">{ type === 'H'? "HOME": "WORK"}</span>
    }

    render() {
        const {addresses} = this.props;
        return (
            addresses.map(address => (
                <Tile key={address._id} >
                    <div className="row">
                        <div className="col-md-10">
                            <div className="small">
                                <span className="mx-2"><strong>{ address.receiverName }</strong></span>
                                {this.getAddressType(address.addressType)}
                                <span className="mx-2"><strong>{ address.receiverMobile }</strong></span>
                            </div>
                            <div className="small my-3">
                                <span>{ `${address.area}, ` }</span>
                                <span>{ `${address.city}, ` }</span>
                                <span>{ `${address.state} - ` }</span>
                                <span><strong>{ address.pincode }</strong></span>
                            </div>
                        </div>
                        <div className="col">
                            <button className="btn btn-light text-primary float-right _text_sm_dark">EDIT</button>
                        </div>
                    </div>
                </Tile>
            ))
        )
    }
}
