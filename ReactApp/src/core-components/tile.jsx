import React, { Component } from "react";

export default class Tile extends Component {
    render() {
        const { header, headerClass, title, children, className, footer, footerClass } = this.props;
        return (
            <div className={className}>
                <div className="card bottom-space">
                    {header && <div className={`card-header ${headerClass}`}>{header}</div>}
                    <div className="card-body">
                        {title && title}
                        {children}
                    </div>
                    {footer && <div className={`card-footer ${footerClass}`}> {footer} </div>}
                </div>
            </div>
        );
    }
}

