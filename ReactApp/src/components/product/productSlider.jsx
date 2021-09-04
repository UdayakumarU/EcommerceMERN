import { React, Component, Link, Tile } from  '../../library';

import ProductOverview from "../product/productOverview";
import ProductSliderButtons from "./productSliderButtons";

class ProductSlider extends Component{
    constructor(props){
        super(props);
        const {products} = props;
        const end = products.length<4? products.length: 4;
        this.state = {visibleProducts:products.slice(0, end), start:0 , end};
    }

    moveleft = () =>{
        const left = { start : this.state.start-1, end : this.state.end-1}
        this.setState({visibleProducts : this.props.products.slice(left.start, left.end), ...left});
    }

    moveRight = () =>{
        const right = { start : this.state.start+1, end : this.state.end+1}
        this.setState({visibleProducts : this.props.products.slice(right.start, right.end), ...right});
    }

    render(){
        const {products, title, link} = this.props;
        const {visibleProducts, start, end} = this.state;
        return (
            <Tile className="m-2 mt-4">
                <ProductSliderButtons 
                    leftEnd={start === 0} 
                    rightEnd={end === products.length}
                    moveleft={this.moveleft}
                    moveRight={this.moveRight}/>

                <div className="d-flex mb-2">
                    <div className="flex-grow-1"><h5>{title}</h5></div>
                    {link && <Link to={link}> <button className="btn btn-dark">VIEW ALL</button> </Link>}
                </div>

                <div className = "row">
                    { visibleProducts.map( (product) => <ProductOverview product={product} key={product.productId}/>) }
                </div>
            </Tile>
        );
    }
}

export default ProductSlider;
