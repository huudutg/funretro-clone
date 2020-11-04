import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {

    Link,
} from "react-router-dom";
import axios from 'axios';
import Cookies from "js-cookie";
import { useHistory } from "react-router-dom";



const Login = () => {
    let history = useHistory();

    const [input, setinput] = useState({ email: '', password: '' })
    const handleChange = (prop) => (event) => {
        setinput({ ...input, [prop]: event.target.value });
    };

    const handleLogin = (params) => {

        axios({
            method: 'post',
            url: `/user/login`,
            data: input
        })
            .then(function (response) {
                console.log('board', response)
                if (response.data) {
                    Cookies.set("token", response.data.id, { expires: 100 });
                    history.push(`/`);

                }
                else {
                    console.log('response', response)
                }

            })
            .catch(function (error) {
                console.log(error);
            });
    }

    return (
        <div className="login">
            <div className="login_wrap">
                <div className="titlte">
                    Login
                </div>
                <div className="input">
                    <TextField
                        id="outlined-secondary"
                        label="Email"
                        variant="outlined"
                        color="secondary"
                        value={input.email}
                        onChange={handleChange('email')}
                    />
                    <TextField
                        id="outlined-secondary"
                        label="Password"
                        type="password"
                        variant="outlined"
                        color="secondary"
                        value={input.password}
                        onChange={handleChange('password')}
                    />
                </div>
                <div className="sub-content">
                    Forgot password?
                </div>
                <div className="btn-group">
                    <Button variant="contained" onClick={handleLogin} color="secondary">
                        Login
                    </Button>
                    <Button variant="contained" color="primary">
                        Google login
                    </Button>
                </div>
                <div className="change">
                    or  <Link to="/register"><span>Register</span></Link>
                </div>
            </div>
        </div>
    );
}

export default Login;
