import { React, Component } from "../../library";

class OrderedProduct extends Component{
    render(){
        return(
            <div className ="row">
                <div className="col-4">
                    <img className="img-thumbnail" src={this.props.thumnail} alt={this.props.productName} />
                </div>
                <div className="col-8">
                    <div className="_cut_text">{this.props.productName}</div>
                    <p className="small text-muted">Seller: {this.props.sellerId}</p>
                    <h6>₹{this.props.price}</h6>
                </div>
            </div>
        ) 
    }
}

export default OrderedProduct;