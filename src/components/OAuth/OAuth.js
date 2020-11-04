import React from 'react';
import Logo from '../../img/loginlogo.png';
import Login from './Login';
import Register from './Register';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    // Link,
} from "react-router-dom";
const OAuth = () => {
    return (
        <div className="oauth">
            <div className="oauth_logo">
                <img src={Logo} alt="a" />

            </div>
            <Switch>
                <Route path="/login">
                    <Login />
                </Route>
                <Route path="/register">
                    <Register />
                </Route>
            </Switch>
        </div>
    );
}

export default OAuth;
