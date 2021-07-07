import React, { Component } from 'react';
import { Link } from 'react-router-dom' ;

import { Tile } from "../../library";

class EmptyCart extends Component {
    render() {

        return (
            <Tile className ="container mt-3"> 
                <div className ="row justify-content-md-center">
                    <div className ="col-md-3 mt-3">
                        <div className = "text-center">
                            <img src={"../empty-cart.png"} alt="Empty cart" style={{ width: "13rem" }} className="img-responsive" />
                            <p className = "blockquote mb-0 mt-3">Your cart is empty!</p>
                            <p><small>Add items to it now</small></p>
                        </div>
                        <Link to = "/" className="btn btn-block _primary_bg"> 
                            Shop now 
                        </Link>
                    </div>
                </div>
            </Tile>
        )
    }
}

export default EmptyCart