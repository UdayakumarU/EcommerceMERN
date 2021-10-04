import { React, Component, Link, Route, Switch, connect } from "../library";

import Login from "../components/loginSignup/login";
import Signup from "../components/loginSignup/signup";

import {setFooterDisplay} from "../redux/misc/misc.action";

const mapDispatchToProps = (dispatch) => ({
    setFooterDisplay : (status) => dispatch(setFooterDisplay(status))    
})

class LoginSignupPage extends Component {
    componentDidMount(){
        this.props.setFooterDisplay(false);
    }

    componentWillUnmount(){
        this.props.setFooterDisplay(true);
    }
    
    render(){
        const {path} = this.props.match;
        return(
            <div className="col-lg-4 col-md-6 col-sm-8 col-xs-8 offset-lg-4 offset-md-3 offset-sm-2 offset-xs-2">
                <Link to="/">
                    <div className="text-center _vertical_space">
                        <img src={"../logo.png"} alt="UKART" style={{ width: "13rem" }} className="img-responsive" />
                    </div>
                </Link>
                <Switch>
                    <Route path={`${path}/register`} component={Signup} />
                    <Route path={`${path}`} component={Login} />
                </Switch>
            </div>
        );
    }
}

export default connect(null, mapDispatchToProps)(LoginSignupPage);