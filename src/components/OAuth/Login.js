import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import Cookies from "js-cookie";
import React, { useState } from 'react';
import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';
import {

    Link, useHistory
} from "react-router-dom";

const Login = () => {
    let history = useHistory();



    const [input, setinput] = useState({ email: '', password: '' })
    const handleChange = (prop) => (event) => {
        setinput({ ...input, [prop]: event.target.value });
    };

    const handleLogin = (params) => {
        login(input);

    }



    const login = (data) => {
        axios({
            method: 'post',
            url: `/user/login`,
            data: data,
            // withCredentials: true
        })
            .then(function (response) {
                if (response.data) {
                    Cookies.set("token", response.data, { expires: 100 });
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

    const onSuccessGoogle = (res) => {
        login({ email: res.profileObj.email, idsocial: res.profileObj.googleId })
    }
    const onFailureGoogle = (res) => {
        console.log('res', res)
    }
    const responseFacebook = (res) => {
        login({ email: res.email, idsocial: res.userID })
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


                    <GoogleLogin
                        className='btn-logingg'
                        clientId="330320688539-ii1mtj75i0ba6us5424q4q4h5bn08h72.apps.googleusercontent.com"
                        buttonText="Login with google"
                        onSuccess={onSuccessGoogle}
                        onFailure={onFailureGoogle}
                        cookiePolicy={'single_host_origin'}
                    />
                    <FacebookLogin
                        appId="310300306716378"
                        autoLoad={false}
                        fields="name,email,picture"
                        callback={responseFacebook}
                        cssClass="my-facebook-button-class"
                    // icon={<TiSocialFacebookCircular />}
                    />

                </div>
                <div className="change">
                    or  <Link to="/register"><span>Register</span></Link>
                </div>
            </div>
        </div>
    );
}

export default Login;
