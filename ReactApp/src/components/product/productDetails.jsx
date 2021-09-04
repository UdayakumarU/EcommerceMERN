import {React, Component, connect} from "../../library";

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
            isNotEmpty(product) && (
                <div className="row">
                    <div className="col-md-5">
                        <ProductLeftSection product={product}/>
                    </div>
                    <div className="col-md-7">
                        <ProductRightSection product={product}/>
                    </div>
                </div>
            )
        );
    }
}

export default connect(mapStateToProps)(ProductDetails);