import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import Cookies from "js-cookie";
import React, { useState } from 'react';
import {

    Link, useHistory
} from "react-router-dom";


const Register = () => {
    const [input, setinput] = useState({ name: '', email: '', password: '' })
    const [state, setState] = React.useState({
        gilad: false,
        jason: false,
        antoine: false,
    });
    let history = useHistory();

    const handleChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked });
    };
    const { gilad } = state;

    const handleRegister = (params) => {
        axios({
            method: 'post',
            url: `/user/register`,
            data: input
        })
            .then(function (response) {
                if (response.status == 200) {
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




    return (
        <div className="login">
            <div className="login_wrap">
                <div className="titlte">
                    Register
                </div>
                <div className="input">
                    <TextField
                        id="outlined-secondary"
                        label="Name"
                        variant="outlined"
                        color="secondary"
                        name="name"
                        value={input.name}
                        onChange={(v) => setinput({ ...input, name: v.target.value })}
                    />
                    <TextField
                        id="outlined-secondary"
                        label="Your email"
                        variant="outlined"
                        color="secondary"
                        value={input.email}
                        onChange={(v) => setinput({ ...input, email: v.target.value })}
                    />
                    <TextField
                        id="outlined-secondary"
                        label="Password"
                        type="password"
                        variant="outlined"
                        color="secondary"
                        value={input.password}
                        onChange={(v) => setinput({ ...input, password: v.target.value })}
                    />
                </div>
                <div className="sub-content-re">
                    Should contain at least 8 chars, 1 number, 1 uppercase, 1 lowercase and 1 special char.
                </div>
                <div className="check">
                    <FormControlLabel
                        control={<Checkbox checked={gilad} onChange={handleChange} name="gilad" />}
                        label="By signing up you agree to our Terms and Privacy Policy"
                    />
                    <FormControlLabel
                        control={<Checkbox checked={gilad} onChange={handleChange} name="gilad" />}
                        label="I want to receive updates, promotions and tips in my inbox"
                    />
                </div>
                <div className="btn-group">
                    <Button variant="contained" onClick={handleRegister} color="secondary">
                        Register
                    </Button>
                    <Button variant="contained" color="primary">
                        Google login
                    </Button>
                </div>
                <div className="change">
                    or  <Link to="/login"><span>Login</span></Link>
                </div>
            </div>
        </div>
    );
}

export default Register;
