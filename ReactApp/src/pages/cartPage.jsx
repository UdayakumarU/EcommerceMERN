import { React, Component, connect, Link, Tile } from "../library";

import Header from "../components/misc/header";
import Footer from "../components/misc/footer";
import EmptyCart from "../components/cart/emptyCart";
import PriceDetail from "../components/priceDetail";
import ItemList from "../components/itemList";

import { getCartItems } from '../redux/cart/cart.selector';
import { removeItemFromCart } from "../redux/cart/cart.action";

const mapStateToProps = () => ({ 
    cartItems : getCartItems()
});

const mapDispatchToProps = (dispatch) => ({
    removeItemFromCart: (productId) => dispatch(removeItemFromCart(productId))
});

class CartPage extends Component {
    render(){
        const { cartItems, removeItemFromCart } = this.props;
        return (
            <React.Fragment>
                <Header hideCart={true}/>
                { (cartItems.length === 0)? <EmptyCart/>:(
                    <div className="container-fluid">
                        <div className="row mt-4">
                            <div className="col-md-8 col-sm-8 mb-3"> 
                                <Tile>
                                    <h5>{`My Cart (${cartItems.length})`}</h5><hr/>
                                    <ItemList items={cartItems} handleRemoveItem ={removeItemFromCart}/>
                                </Tile>
                                <Tile>
                                    <div className="row">
                                        <div className= "offset-md-7 col-md-5 offset-6 col-6">
                                            <Link to="./checkout" 
                                                className="btn btn-dark btn-block" 
                                                onClick={this.handlePlaceOrder}> 
                                                    <small>PLACE ORDER</small>  
                                            </Link>
                                        </div>
                                    </div>
                                </Tile>
                            </div>
                            <div className="col-md-4 col-sm-4"> 
                                <PriceDetail items={cartItems}/> 
                            </div>
                        </div>
                    </div>
                ) }
                <Footer/>
            </React.Fragment>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CartPage);