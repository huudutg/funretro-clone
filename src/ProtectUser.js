import React, { useEffect } from 'react';
import {
    Route,
    Redirect,
    useLocation
} from 'react-router-dom';
import Cookies from "js-cookie";

function ProtectUser({ children, ...rest }) {

    useEffect(() => {
        const temp = Cookies.get("token");
        console.log('temp', temp)
    }, []);

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