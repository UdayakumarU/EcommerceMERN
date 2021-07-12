import React from "react";
import { connect } from "react-redux";

import { setErrorMessage } from "../redux/misc/misc.action" 
import 'bootstrap/js/src/alert'

const mapDispatchToProps = (dispatch) => ({
  removeErrorMessage : () => dispatch(setErrorMessage([]))
})

const Error = ({messages, removeErrorMessage}) => {
  return(
    <div className="offset-md-3 col-md-6 offset-sm-1 col-sm-10 animate-error">
      <div className="alert alert-danger alert-dismissible" role="alert">
        <ul className="mb-0"> {messages.map((message,index) =><li key={index}><h6>{message}</h6></li>)} </ul>
        <button
          type="button"
          className="close"
          data-dismiss="alert"
          aria-label="Close"
          onClick = {removeErrorMessage}
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
    </div>
  )
}

export default connect(null, mapDispatchToProps)(Error);
