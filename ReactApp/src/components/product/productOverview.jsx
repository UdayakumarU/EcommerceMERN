import { React, Component, Link, Tile } from  '../../library';

import WishlistButton from './wishlistButton';
import { calculatePriceAfterDiscount, numberToPrice } from '../../utils/util';

class ProductOverview extends Component{
    render(){
        const {brand, productName, productActualPrice, discount, productId, productImages} = this.props.product;
        return <Tile
            className="col-md-3"
            footer={
                <React.Fragment>
                    <h6 className="text-muted">{brand}</h6>
                    <span className="_cut_text">{productName}</span>
                    <div> 
                        <strong className="mr-2">₹{numberToPrice(calculatePriceAfterDiscount(productActualPrice, discount))}</strong>
                        <s className="mr-2">{productActualPrice}</s>
                        <small className="text-success"><strong>{discount}% off</strong></small>  
                    </div>
                </React.Fragment>
            }
        >
            <WishlistButton/>
            <Link to={'/product/' + productId}>
                <img
                    src={productImages[0]}
                    className="card-img-top"
                    alt={productName}
                />
            </Link>
        </Tile>
    }
}

export default ProductOverview;
