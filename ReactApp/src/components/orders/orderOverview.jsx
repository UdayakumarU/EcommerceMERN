import { React, Component, Tile, withRouter } from "../../library";

class OrderOverview extends Component{
    getFormatedDate=(date)=>{
        const newDate = new Date(date);
        const month = new Intl.DateTimeFormat('en-US', { month: 'short'}).format(newDate)
        const day = newDate.getDate();
        const year = newDate.getFullYear();
        return `${month} ${day}, ${year}`;
    }
    
    navigateToOrderDetail = () =>{
        this.props.history.push("/order-details");
    }

    render() {
        return (
            <Tile className ="_pointer _hoverable mt-2" onClick={this.navigateToOrderDetail}>
                <div className ="row">
                    <div className="col-md-2">
                        <img className="img-thumbnail" src={this.props.thumnail} alt={this.props.productName} />
                    </div>
                    <div className="col-md-4">
                        <p className="_cut_text">{this.props.productName}</p>
                        <p className="small text-muted">Seller: {this.props.sellerId}</p>
                    </div>
                    <div className="col-md-2">
                        <p>₹{this.props.price}</p>
                    </div>
                    <div className="col-md-4">
                        <small>
                            <span className="badge badge-success mr-2"> </span> 
                            <strong>{this.props.status} on {this.getFormatedDate(this.props.orderedDate)} </strong>
                        </small>
                    </div>
                </div>
            </Tile>
        )
    }
}

export default withRouter(OrderOverview);