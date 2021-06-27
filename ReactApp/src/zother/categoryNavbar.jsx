import React from 'react';

export default function CategoryNavbar() {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarText">
        <ul className="navbar-nav mr-auto">
            <li className="nav-item">
            <a className="nav-link" href="#">Home</a>
            </li>
            <li className="nav-item">
            <a className="nav-link" href="#">Features</a>
            </li>
            <li className="nav-item">
            <a className="nav-link" href="#">Pricing</a>
            </li>
        </ul>
        </div>
        </nav>
        )}