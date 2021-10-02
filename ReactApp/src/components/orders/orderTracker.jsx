import { React, Component } from "../../library";

import { mapOrderStatusDetails } from "../../utils/util";

class OrderTracker extends Component {
    render() {
        const tracks = mapOrderStatusDetails(this.props.statusTrack);
        const completion = (tracks.filter(track=>track.statusCd).length-1) * 33;
         //may i need a better approach
        const gradientDegree = (window.innerWidth > 768) ? '90deg' : '180deg';
        const style = { background : `linear-gradient(${gradientDegree}, #26a541 0 ${completion}%, #ccc ${completion}% 100%)` };

        return (
            <div className="_tracker_line" style={style}>
                {tracks.map(track => (
                    <div
                        key={track._id}
                        className={`${track.statusCd?"_tracker_point_complete":"_tracker_point_incomplete"}`}
                        date={track.date}
                        status={track.status}>
                    </div>) )
                }
            </div>
        );
    }
}

export default OrderTracker;