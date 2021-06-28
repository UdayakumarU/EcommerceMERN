import React from "react";
import { connect } from "react-redux";

import { getSections } from "../../redux/directory/directory.selector";

const mapStateToProps = state =>({
    sections : getSections(state)
});

const Directory = ({sections}) => {
    return (
        <nav className="navbar navbar-dark bg-dark navbar-expand-lg navbar-expand-lg">
            <ul className="navbar-nav text-md-center nav-justified w-100">
            {
                sections.map((section, index) => (
                    <li className={`nav-item ${index === 0 ? 'active' : ''}`} key={index}>
                        <a className="nav-link" href="/">{section.title.toUpperCase()}</a>
                    </li>)
                )
            }
            </ul>
        </nav>
    );
}

export default connect(mapStateToProps)(Directory);