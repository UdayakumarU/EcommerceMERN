import { React, Component } from "../../library";

class OrderedAddress extends Component{
    render(){
        return(
            <div className ="row">
                <div className="col-md-12">
                    <h6>Delivery Address</h6>
                    <small>
                        <div className="font-weight-bold my-2">{this.props.address.receiverName}</div>
                        <div>{this.props.address.area}, {this.props.address.landmark}</div>
                        <div>{this.props.address.city} - {this.props.address.pincode}, {this.props.address.state}</div>
                    </small>
                    <small>
                        <div className="font-weight-bold mt-2">Phone number</div>
                        <div>{this.props.address.receiverMobile}</div>
                    </small>
                </div>
            </div>
        ) 
    }
}

export default OrderedAddress;