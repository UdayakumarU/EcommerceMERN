import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => (
    <nav className="navbar navbar-dark text-dark sticky-top _primary_bg">
        <Link to={'/'}>
            <img src={"../logo.png"} alt="UKART" style={{ width: "8rem" }} className="img-responsive" />
        </Link>
        <div className ="my-2">
            <Link to={'/user/login'} className="mr-sm-2">
                <button className="btn btn-outline-dark">Login</button>
            </Link>
            <Link to={'/cart'} className ="my-2 my-sm-0">
                <button className="btn btn-dark">
                    <i className="material-icons">shopping_cart</i>
                    <span className="align-straight">Cart</span>
                </button>
            </Link>
        </div>
    </nav>
 )

export default Header;