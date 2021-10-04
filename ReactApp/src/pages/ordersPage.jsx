import { React, Component, connect } from "../library";

import Header from "../components/misc/header";
import Directory from "../components/misc/directory";
import OrdersList from "../components/orders/ordersList";

import { setCustomerOrders } from "../redux/customer/customer.action";
import { setLoader, setErrorMessage } from "../redux/misc/misc.action";

import * as api from "../api/api";

const mapDispatchToProps = (dispatch) => ({
    setCustomerOrders: (orders) => dispatch(setCustomerOrders(orders)),
    setLoader: (status) => dispatch(setLoader(status)),
    setErrorMessage: (errors) => dispatch(setErrorMessage(errors))
});

class OrdersPage extends Component {
    componentDidMount(){
        const { setCustomerOrders, setLoader, setErrorMessage } = this.props;
        setLoader(true);
        api.getOrders().then( response => {
            setCustomerOrders(response);
            setLoader(false);
        }, reject => {
            setErrorMessage([reject]);
            setLoader(false);
        })
    }
    render() {  
        return (
            <React.Fragment>
                <Header/>
                <Directory/>
                <div className="container">
                    <div className="row">
                        <div className="offset-md-1 col-md-10">
                            <OrdersList />
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default connect(null, mapDispatchToProps)(OrdersPage);