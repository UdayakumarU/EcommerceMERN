import React from "react";
import { Link, Route, Switch, useRouteMatch } from "react-router-dom";

import Login from "../section/login";
import Signup from "../section/signup";

const LoginSignupPage = () => {
    const {path} = useRouteMatch();
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

export default LoginSignupPage;