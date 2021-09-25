import { React, Component, Tile, withRouter } from "../../library";
import { getFormattedDate } from "../../utils/util";
import APP_CONST from "../../APP_CONST";

class OrderOverview extends Component{
    navigateToOrderDetail = () =>{
        this.props.history.push(`/order-details/${this.props.orderId}`);
    }

    render() {
        return (
            <Tile className ="_pointer _hoverable mt-2" onClick={this.navigateToOrderDetail}>
                <div className ="row">
                    <div className="col-md-2 col-4">
                        <img className="img-thumbnail" src={this.props.thumnail} alt={this.props.productName} />
                    </div>
                    <div className="col-md-4 col-5">
                        <p className="_cut_text">{this.props.productName}</p>
                        <p className="small text-muted">Seller: {this.props.sellerId}</p>
                    </div>
                    <div className="col-md-2 col-3">
                        <p>₹{this.props.price}</p>
                    </div>
                    <div className="col-md-4 col-12">
                        <small>
                            <span className="badge badge-success mr-2"> </span> 
                            <strong>{this.props.status} on {getFormattedDate(this.props.orderedDate, APP_CONST.DATE_FORMAT.MDtY)} </strong>
                        </small>
                    </div>
                </div>
            </Tile>
        )
    }
}

export default withRouter(OrderOverview);