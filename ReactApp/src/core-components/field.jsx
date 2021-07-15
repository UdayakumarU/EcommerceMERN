import React, { Component } from "react";

export default class Field extends Component {

    getFieldByType = (props) => {
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
        const { id, label, errorlabel } = this.props;
        return (
            <div className="form-group _text_sm_dark">
                <label htmlFor={id}>{label}</label>
                {this.getFieldByType(this.props)}
                {errorlabel && <small className="text-danger"><strong>{errorlabel}</strong></small>}
            </div>
        );
    }
}