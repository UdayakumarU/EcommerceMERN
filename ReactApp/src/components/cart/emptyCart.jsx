import { React, Component, Link, connect, Tile } from "../../library";
import { getCustomerLoginStatus } from "../../redux/customer/customer.selector";

const mapStateToProps = () => ({
    Loggedin: getCustomerLoginStatus()
});

class EmptyCart extends Component {
    loggedInCartSection = () =>{
        return (
            <React.Fragment>
                <div className="text-center">
                    <p className="blockquote mb-0 mt-3">Your cart is empty!</p>
                    <p><small>Add items to it now</small></p>
                </div>
                <div className="offset-md-2 col-md-8">
                    <Link to="/" className="btn btn-block _primary_bg"> Shop now </Link>
                </div>
            </React.Fragment>
        )
    }
    
    loggedOutCartSection = () =>{
        return (
            <React.Fragment>
                <div className="text-center">
                    <p className="blockquote mb-0 mt-3">Missing Cart items?</p>
                    <p><small>Login to see the items you added previously</small></p>
                </div>
                <div className="offset-md-2 col-md-8">
                    <Link to="/user/login" className="btn btn-block _primary_bg"> Login </Link>
                </div>
            </React.Fragment>
        )
    }

    render() {
        const { Loggedin } = this.props;
        return (
            <Tile className ="container mt-4"> 
                <div className ="row justify-content-md-center">
                    <div className ="col-md-4 mt-4 mb-4">
                        <div className = "text-center">
                            <img src={"../empty-cart.png"} alt="Empty cart" style={{ width: "13rem" }} className="img-responsive" />
                            { Loggedin? this.loggedInCartSection(): this.loggedOutCartSection() }
                        </div>
                    </div>
                </div>
            </Tile>
        )
    }
}

export default connect(mapStateToProps)(EmptyCart);