import { React, Component, connect } from "../library";

import Header from "../components/misc/header";
import Directory from "../components/misc/directory";
import Breadcrum from "../components/misc/breadcrum";
import ProductList from "../components/product/productList";

import { getHomeProducts } from "../redux/product/product.selector";
import { getProductsByType, getBreadcrumSections } from "../utils/util";


const mapStateToProps = (state, props) => {
    const products = getHomeProducts();
    let productsByType, breadcrumSections;
    if( props.match.params.subCategory ){
        productsByType = getProductsByType(products, props.match.params.subCategory, 'subCategory');
        breadcrumSections = getBreadcrumSections([props.match.params.category, props.match.params.subCategory]);
    }
    else{
        productsByType = getProductsByType(products, props.match.params.category, 'category');
        breadcrumSections = getBreadcrumSections([props.match.params.category]);
    }
    return {
        productsByType,
        breadcrumSections 
    };
};

class DirectoryPage extends Component {
    render(){
        const {productsByType, breadcrumSections} = this.props;
        return (
            <React.Fragment>
                <Header/>
                <Directory/>
                <div className ="container">
                    <Breadcrum sections = {breadcrumSections}/>
                    <ProductList products = {productsByType}/>
                </div>
            </React.Fragment>
        );
    }
}

export default connect(mapStateToProps)(DirectoryPage);