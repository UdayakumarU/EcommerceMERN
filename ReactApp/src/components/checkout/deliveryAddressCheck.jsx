import React, { Component } from 'react'

import {Tile} from "../../library";

class DeliveryAddressCheck extends Component {
    constructor(props){
        super(props);
        this.state = { 
            isChecked : this.props.deliveryCheck, 
        }
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

    showUncheckedDeliveryAddress = () => (
            <div className="container">
                Address list comes here
            </div>
    );

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

export default DeliveryAddressCheck;