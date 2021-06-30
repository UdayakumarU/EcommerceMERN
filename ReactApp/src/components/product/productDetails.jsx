import React, { Component } from "react";
import { connect } from "react-redux";

import ProductLeftSection from "./productLeftSection";
import ProductRightSection from "./productRightSection";
import { getSelectedProduct } from "../../redux/product/product.selector";
import { isNotEmpty } from "../../utils/modelutils";

const mapStateToProps = (state) => ({
    product : getSelectedProduct(state)
});

class ProductDetails extends Component {
    render(){
        const { product } = this.props;
        return ( 
             <div className="container">
                {isNotEmpty(product) && (
                    <div className="row">
                        <div className="col-md-5">
                            <ProductLeftSection product = {product}/>
                        </div>
                        <div className ="col-md-7">
                            <ProductRightSection product = {product}/>
                        </div>
                    </div>)
                }
            </div>
        );
    }
}

export default connect(mapStateToProps)(ProductDetails);