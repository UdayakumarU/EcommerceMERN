import React, { Component } from 'react'
import { connect } from 'react-redux';

import {Tile} from "../../library";
import { getCustomerName } from "../../redux/customer/customer.selector";

const mapStateToProps = (state) => {
    return {
        customerName : getCustomerName(state)
    }
};

class LoginCheck extends Component {
    constructor(){
        super();
        this.state = { isChangeRequired : false }
        this.headerContent = (
            <h6>
                <span class="badge badge-dark px-2 py-1">1</span>
                <span className="text-muted px-3">LOGIN</span>
            </h6>
        );
    }
    
    handleChange = () =>{
        this.setState({isChangeRequired:true})
    }

    render() {
        const {isChangeRequired} = this.state;
        const {customerName} = this.props;
        return (
            <Tile 
                className="mb-3"
                headerClass ="_primary_bg"
                header={isChangeRequired && this.headerContent}>
                {!isChangeRequired && ( 
                    <div className="row">
                        <div className="col-md-1">
                            <span class="badge badge-light px-2 py-1">1</span>
                        </div>
                        <div className="col-md-9">
                            <h6>
                                <span className="text-muted">LOGIN</span>
                                <span className="text-dark ml-2"><strong>&#x2713;</strong></span>
                            </h6> 
                            <small>{customerName}</small>   
                        </div>
                        <div className="col-md-2">
                            <button className ="btn btn-outline-dark" onClick={this.handleChange}>Change</button>
                        </div>
                    </div>)
                }
            </Tile>
        )
    }
}

export default connect(mapStateToProps)(LoginCheck);