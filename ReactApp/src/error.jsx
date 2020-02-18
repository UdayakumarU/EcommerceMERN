import React, { Component } from "react";
import 'bootstrap/js/src/alert'

class Error extends Component {
  render() {

    const styleError = { 
      position: "absolute",
      top:"65px"
     }
     
    return (
    <div className="offset-md-2 col-md-8 offset-sm-1 col-sm-10 animate-error" style={styleError}>
      <div className="alert alert-danger alert-dismissible fade show text-center" role="alert">
        {this.props.message}!{this.props.message === "Network Error"?" Please contact technical team.":""} 
        <button
          type="button"
          className="close"
          data-dismiss="alert"
          aria-label="Close"
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
    </div>
    );
  }
}

export default Error;
