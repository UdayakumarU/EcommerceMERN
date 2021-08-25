import React, { Component } from 'react';

import { Tile } from "../../../library";
import APP_CONST from "../../../APP_CONST";

export default class OrderSummaryCheck extends Component {

    getHeaderContent = (color) => (
        <React.Fragment>
            <span className={`badge badge-${color} px-2 py-1`}>3</span>
            <span className="text-muted px-3"><strong>ORDER SUMMARY</strong></span>
        </React.Fragment>
    );

    showUncheckedOrderSummary = () =>{
        return( 
            <div className="row">
                <div className="col-md-9 col-sm-9 col-9">
                    {this.getHeaderContent('light')}
                </div>
            </div>
        );
    }
    
    showCheckedOrderSummary = () =>{
        return <div></div>
    }

    render() {
        return (
            <Tile
                className="mb-3"
                headerClass ="_primary_bg"
                header={"stepThreeStatus" === APP_CONST.OPEN && this.getHeaderContent('dark')}>
                {"stepThreeStatus" === APP_CONST.CHECKED? this.showCheckedOrderSummary(): this.showUncheckedOrderSummary()}
            </Tile>
        )
    }
}
