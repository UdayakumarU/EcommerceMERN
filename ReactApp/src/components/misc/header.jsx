import { React, Link, connect } from "../../library";

import CutomerQuickLinks from '../loginSignup/cutomerQuickLinks';
import { getCustomerLoginStatus } from "../../redux/customer/customer.selector";

const mapStateToProps = () => ({
    customerLoggedIn: getCustomerLoginStatus()
});

const Header = ({hideCart, hideLogin, customerLoggedIn}) => {

    return (
        <nav className="navbar navbar-dark text-dark sticky-top _primary_bg pt-0 pb-0">
            <Link to={'/'} className="my-2 mx-2">
                <img src={"../logo.png"} alt="UKART" style={{ width: "8rem" }} className="img-responsive" />
            </Link>
            <div className ="mx-2">
                {!hideLogin && (customerLoggedIn?
                    <CutomerQuickLinks/>:
                    <Link to={'/user/login'} className="mr-sm-2">
                        <button className="btn btn-outline-dark">Login</button>
                    </Link>)
                }
                {!hideCart && <Link to={'/cart'} className ="my-2 my-sm-0">
                    <span className="btn">
                        <i className="material-icons">shopping_cart</i>
                        <span className="align-straight">Cart</span>
                    </span>
                </Link>
                }
            </div>
        </nav>
    )
}

export default connect(mapStateToProps)(Header);