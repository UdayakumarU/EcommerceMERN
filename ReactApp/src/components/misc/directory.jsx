import { React, Link, connect } from "../../library";

import { getCategories } from "../../redux/directory/directory.selector";

const mapStateToProps = () => ({
    categories: getCategories()
});

const Directory = ({categories}) => {
    return (
        <nav className="navbar navbar-dark bg-dark navbar-expand-lg navbar-expand-lg p-1">
            <button className="navbar-toggler" data-toggle="collapse" data-target="#directoryList">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="directoryList">
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
            </div>
        </nav>
    );
}

export default connect(mapStateToProps)(Directory);