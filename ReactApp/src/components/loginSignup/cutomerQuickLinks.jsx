import React, { Component } from 'react'
import { connect } from 'react-redux';

import { getCustomerName } from "../../redux/customer/customer.selector";
import { logoutCustomer } from "../../redux/customer/customer.action";

const mapStateToProps = (state) => {
    const customerName = getCustomerName(state);
    return {
        customerName
    };
}

const mapDispatchToProps = dispatch =>({
    logoutCustomer : () => dispatch(logoutCustomer())
});

class CutomerQuickLinks extends Component {
    render() {
        const {customerName, logoutCustomer} = this.props;
        return (
            <span className="dropdown">
                <button className="btn dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    {customerName}
                </button>
                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    <span className="btn dropdown-item" onClick={logoutCustomer}>Logout</span>
                </div>
            </span>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CutomerQuickLinks);