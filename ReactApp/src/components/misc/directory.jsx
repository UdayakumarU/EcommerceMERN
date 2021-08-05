import React from "react";
import { Link } from 'react-router-dom';
import { connect } from "react-redux";

import { getCategories } from "../../redux/directory/directory.selector";

const mapStateToProps = state =>({
    categories : getCategories(state)
});

const Directory = ({categories}) => {
    return (
        <nav className="navbar navbar-dark bg-dark navbar-expand-lg navbar-expand-lg p-1">
            <ul className="navbar-nav text-md-center nav-justified w-100">
            {
                categories.map((category) => (
                    <li className="nav-item" key={category.id}>
                        <Link 
                            className="nav-link small text-light" 
                            to={`/${category.title.toLowerCase()}`}>
                                {category.title.toUpperCase()}
                        </Link>
                    </li>)
                )
            }
            </ul>
        </nav>
    );
}

export default connect(mapStateToProps)(Directory);