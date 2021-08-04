import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import CutomerQuickLinks from '../loginSignup/cutomerQuickLinks';
import { getCustomerLoginStatus } from "../../redux/customer/customer.selector";

const mapStateToProps = (state) => {
    const customerLoggedIn = getCustomerLoginStatus(state);
    return {
        customerLoggedIn
    };
}

const Header = ({hideCart, customerLoggedIn}) => {

    return (
        <nav className="navbar navbar-dark text-dark sticky-top _primary_bg pt-0 pb-0">
            <Link to={'/'}>
                <img src={"../logo.png"} alt="UKART" style={{ width: "8rem" }} className="img-responsive" />
            </Link>
            <div className ="my-2">
                {customerLoggedIn?
                    <CutomerQuickLinks/>:
                    <Link to={'/user/login'} className="mr-sm-2">
                        <button className="btn btn-outline-dark">Login</button>
                    </Link>
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