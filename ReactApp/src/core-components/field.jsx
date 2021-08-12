import React, { Component } from "react";

export default class Field extends Component {

    getFieldByType = (props) => {
        const { inputType, handleChange, errorlabel, ...otherProps} = props;
        const className = `form-control ${errorlabel? "is-invalid": ""}`;
        switch(inputType){
            case "TEXTBOX": return(
                <input
                    type = "text"
                    className={className}
                    {...otherProps}
                />
            );
            case "PASSWORD": return(
                <input
                    type = "password"
                    className={className}
                    {...otherProps}
                />
            );
            case "NUMBER": return(
                <input
                    type = "text"
                    pattern="\d*"
                    className={className}
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
                {errorlabel && 
                <div class="invalid-feedback">{errorlabel}</div>}
            </div>
        );
    }
}