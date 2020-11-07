import React from 'react';
import {
    Route,
    Redirect,
    useLocation
} from 'react-router-dom';
import Cookies from "js-cookie";

function ProtectUser({ children, ...rest }) {


    const location = useLocation();
    return (
        <Route
            {...rest}
            render={() =>
                Cookies.get("token") ? (
                    children
                ) : (
                        <Redirect
                            to={{
                                pathname: "/login",
                                state: { from: location }
                            }}
                        />
                    )
            }
        />
    );
}

export default ProtectUser;