import { React, Component, connect, withRouter } from "../../library";

import { getCartItems } from "../../redux/cart/cart.selector";
import { addItemToCart } from '../../redux/cart/cart.action';
import { isCartHasThisItem } from "../../utils/cartUtils";

import APP_CONST from "../../APP_CONST";

const mapStateToProps = () => ({
  cartItems: getCartItems()
});

const mapDispatchToProps = dispatch => ({
  addItemToCart: (item) => dispatch(addItemToCart(item))
});

class ProductLeftSection extends Component {
  addToCart = () =>{
    const { addItemToCart, product, cartItems, history } = this.props;
    if(!isCartHasThisItem(cartItems, product)){
      addItemToCart(product);
    }
    history.push('/cart');
  } 
  
  buyNow = () => {
    const { addItemToCart, product, cartItems, history } = this.props;
    if(!isCartHasThisItem(cartItems, product)){
      addItemToCart(product);
    }
    history.push(`/checkout?${APP_CONST.QUERY.PRODUCT_ID}=${product.productId}`);
  }
  
  render() {
    const { productImages, productName } = this.props.product;
    return (
      <div>
        <img className="img-thumbnail" src={productImages[0]} alt={productName} />
        <br /><br />
        <div className="row mb-3">
          <div className="col-6 pr-0">
            <button className="btn btn-outline-dark btn-md btn-block" onClick={this.addToCart}>
              <i className="material-icons _align_middle">shopping_cart</i>
              <span className="align-straight _align_middle">Add to Cart</span> 
            </button>
          </div>
          <div className="col-6 pl-1">
            <button className="btn btn-dark btn-md btn-block" onClick={this.buyNow}>
              <i className="material-icons _align_middle">play_arrow</i>
              <span className="align-straight _align_middle">Buy Now</span>
            </button>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProductLeftSection));