import{ React, Component, connect } from "../library";

import Banner from "../core-components/banner";
import Header from "../components/misc/header";
import Directory from "../components/misc/directory";
import ProductSlider from "../components/product/productSlider";

import { getHomeProducts } from "../redux/product/product.selector";
import { addHomeProducts } from "../redux/product/product.action";

import { getProductsByType } from "../utils/util";
import * as api from "../api/api.js";

const caroselitems = [
    {imageUrl:"./banners/banner1.jpg", altName:"First slide"},
    {imageUrl:"./banners/banner2.jpg", altName:"Second slide"},
    {imageUrl:"./banners/banner3.jpg", altName:"Third slide"},
];

const mapStateToProps = () => {
    const products = getHomeProducts();
    return {
        trending: products,
        fashions: getProductsByType(products, "Fashion", 'category'),
        electronics: getProductsByType(products, "Electronics", 'category')
    };
}

const mapDispatchToProps = dispatch => ({
    addHomeProducts: (products) => dispatch(addHomeProducts(products))
});

class HomePage extends Component {
    componentDidMount() {
        api.getProducts().then( response => {
            this.props.addHomeProducts(response);
        })
    }

    render(){
        const {trending,fashions,electronics} = this.props;
        return (
            <React.Fragment>
                <Header/>
                <Directory/>
                <div className="_light_bg">
                    <Banner items={caroselitems}/>
                    <ProductSlider products = {trending} title="Trending Offers"/>
                    <ProductSlider products = {fashions} title="Fashions" link="/fashion"/>
                    <ProductSlider products = {electronics} title="Electronics" link="/electronics"/>
                </div>
            </React.Fragment>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);