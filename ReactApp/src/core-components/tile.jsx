import React, { Component } from "react";

export default class Tile extends Component {
    render() {
        const { title, children, className, footer, footerClass } = this.props;
        return (
            <div className={className}>
                <div className="card bottom-space">
                    {title && <h4 className="card-header">{title}</h4>}
                    <div className="card-body">
                        {children}
                    </div>
                    {footer && <div className={`card-footer ${footerClass}`}> {footer} </div>}
                </div>
            </div>
        );
    }
}

