import { React, Component, connect, isNotEmpty } from "../../library";

import ProductLeftSection from "./productLeftSection";
import ProductRightSection from "./productRightSection";

import { getSelectedProduct } from "../../redux/product/product.selector";

const mapStateToProps = () => ({
    product: getSelectedProduct()
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