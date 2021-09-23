import { React, Component } from "../../library";

class OrderTracker extends Component {
    render() {
        return (
            <div className="_tracker_line">
                <div className="_tracker_point" date="789" status="Ordered">
                </div>
                <div className="_tracker_point" date="789" status="Cancelled">
                </div>
            </div>
        );
    }
}

export default OrderTracker;