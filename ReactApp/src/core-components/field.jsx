import { React, Component } from "../library";

export default class Field extends Component {

    getFieldByType = (props) => {
        const { inputType, handleChange, errorlabel, ...otherProps } = props;
        const className = `form-control ${errorlabel? "is-invalid": ""}`;
        switch(inputType){
            case "TEXTBOX": return(
                <input
                    type="text"
                    className={className}
                    {...otherProps}
                />
            );
            case "PASSWORD": return(
                <input
                    type="password"
                    className={className}
                    {...otherProps}
                />
            );
            case "NUMBER": return(
                <input
                    type="text"
                    pattern="\d*"
                    className={className}
                    {...otherProps}
                />
            );
            case "RADIO": return (
                <input
                    type="radio"
                    className="custom-control-input"
                    {...otherProps}
                />
            );
            default: return "wew";
        }
    }
    
    render() {
        const { id, label, errorlabel, inputType } = this.props;
        return (
            inputType === "RADIO"?(
                <div className="custom-control custom-radio custom-control-inline">
                    {this.getFieldByType(this.props)}
                    <label className="custom-control-label _text_sm" htmlFor={id}>{label}</label>
                </div>
            ):(
                <div className="form-group _text_sm_dark">
                    <label htmlFor={id}>{label}</label>
                    {this.getFieldByType(this.props)}
                    {errorlabel && <div className="invalid-feedback">{errorlabel}</div>}
                </div>
            )
        );
    }
}