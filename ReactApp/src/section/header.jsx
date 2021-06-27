import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => (
    <nav className="navbar navbar-dark text-dark sticky-top _primary_bg">
        <Link to={'/'}>
            <img src={"../logo.png"} alt="UKART" style={{ width: "8rem" }} className="img-responsive" />
        </Link>
        <Link to={'/user/login'}>
            <button className="btn btn-outline-dark">Login</button>
        </Link>
    </nav>
 )

export default Header;