import React, { Component } from "react";

export default class Field extends Component {
    constructor(props){
        super(props);
        this.getFieldByType = this.getFieldByType.bind(this);
    }

    getFieldByType(props){
        const { inputType, handleChange, ...otherProps} = props;
        switch(inputType){
            case "TEXTBOX": return(
                <input
                    type = "text"
                    className="form-control"
                    {...otherProps}
                />
            );
            case "PASSWORD": return(
                <input
                    type = "password"
                    className="form-control"
                    {...otherProps}
                />
            );
            default: return "wew";
        }
    }
    render() {
        const { id, label, errorLabel } = this.props;
        return (
            <div className="form-group _text_sm_dark">
                <label htmlFor={id}>{label}</label>
                {this.getFieldByType(this.props)}
                {errorLabel && <small className="text-danger">{errorLabel}</small>}
            </div>
        );
    }
}