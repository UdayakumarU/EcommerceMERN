import { React, Component } from "../../library";

class OrderedProduct extends Component{
    render(){
        return(
            <div className ="row">
                <div className="col-md-4">
                    <img className="img-thumbnail" src={this.props.thumnail} alt={this.props.productName} />
                </div>
                <div className="col-md-8">
                    <p className="_cut_text">{this.props.productName}</p>
                    <p className="small text-muted">Seller: {this.props.sellerId}</p>
                    <p>₹{this.props.price}</p>
                </div>
            </div>
        ) 
    }
}

export default OrderedProduct;