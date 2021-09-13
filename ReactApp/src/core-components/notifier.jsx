import { React, connect } from "../library";

import { setErrorMessage, setSuccessMessage } from "../redux/misc/misc.action";
import APP_CONST from "../APP_CONST";

const mapDispatchToProps = (dispatch) => ({
  removeErrorMessage: () => dispatch(setErrorMessage([])),
  removeSuccessMessage: () => dispatch(setSuccessMessage([]))
})

class Notifier extends React.Component{ 
  
  removeMessage = () => {
    const {removeErrorMessage, removeSuccessMessage, messageType} = this.props;
    if(messageType === APP_CONST.SUCCESS){
      removeSuccessMessage();
    }
    else{
      removeErrorMessage();
    }
  }

  render(){
    const { messages, messageType } = this.props;
    const alertClass = messageType === APP_CONST.SUCCESS?'alert-success':'alert-danger';
    return(
      <div className="offset-md-3 col-md-6 offset-sm-1 col-sm-10 animate-error">
        <div className={`alert ${alertClass} alert-dismissible`} role="alert">
          <ul className="mb-0"> {messages.map((message,index) =><li key={index}><h6>{message}</h6></li>)} </ul>
            <button
              type="button"
              className="close"
              data-dismiss="alert"
              aria-label="Close"
              onClick = {this.removeMessage}
            >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
      </div>
    )
  }
}

export default connect(null, mapDispatchToProps)(Notifier);
