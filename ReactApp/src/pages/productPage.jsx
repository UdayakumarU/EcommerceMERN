import { React, Component, connect } from "../library";

import Footer from "../components/misc/footer";
import Header from "../components/misc/header";
import Directory from "../components/misc/directory";
import Breadcrum from "../components/misc/breadcrum";
import ProductDetails from "../components/product/productDetails";

import { getHomeProducts } from "../redux/product/product.selector";
import { setCurrentProduct } from "../redux/product/product.action";
import { getProductById, getBreadcrumSections } from "../utils/util";

const mapStateToProps = (state, props) => {
    const availableProducts = getHomeProducts();
    const selectedProduct = getProductById(availableProducts, props.match.params.productId);
    const breadcrumSections = getBreadcrumSections(selectedProduct);
    return { 
        selectedProduct, 
        breadcrumSections 
    };
};

const mapDispatchToProps = (dispatch) => ({
    setCurrentProduct: (selectedProduct) => dispatch(setCurrentProduct(selectedProduct))
});

class ProductPage extends Component {
    componentDidMount(){
        const { setCurrentProduct, selectedProduct } = this.props;
        setCurrentProduct(selectedProduct);
    }

    render(){
        return (
            <React.Fragment>
                <Header/>
                <Directory/>
                <div className ="container">
                    <Breadcrum sections={this.props.breadcrumSections}/>
                    <ProductDetails/>
                </div>
                <Footer/>
            </React.Fragment>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductPage);