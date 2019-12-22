import React, { Component } from 'react';

class Footer extends Component {
    render() {
        return (
            <footer
                id="sticky-footer"
                className="py-4 bg-dark text-white-50"
                style={{ marginTop: "130px" }}
            >
                <div className="container text-center">
                    <small>Copyright &copy; UdayShop</small>
                </div>
            </footer>
        );
    }
}

export default Footer;