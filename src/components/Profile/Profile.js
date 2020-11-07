import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { Alert, AlertTitle } from '@material-ui/lab';
import axios from 'axios';
import Cookies from "js-cookie";
import React, { useEffect, useState } from 'react';
import DashBoardNavbar from '../Home/DashBoardNavbar';
const Profile = () => {
    const [input, setinput] = useState({ name: '', email: '', password: '' })
    const [alert, setalert] = useState(false);
    const [success, setsuccess] = useState(false)

    const handleChange = (prop) => (event) => {
        setinput({ ...input, [prop]: event.target.value });
    };

    const handleUpdate = (params) => {
        setalert(false)
        if (input.name && input.email && input.password) {
            axios({
                method: 'post',
                url: `/user/update`,
                data: input,
                withCredentials: true
            })
                .then(function (response) {
                    if (response.status === 200) {
                        setsuccess(true);
                        setTimeout(() => {
                            setsuccess(false)
                        }, 3000)
                    }
                    else {
                        console.log('response', response)
                    }

                })
                .catch(function (error) {
                    console.log(error);
                });
        }
        else {
            setalert(true)
            setTimeout(() => {
                setalert(false)
            }, 3000)
        }
    }


    useEffect(() => {
        axios.get(`user/profile`, { withCredentials: true })
            .then(function (response) {
                setinput({ name: response.data.name, email: response.data.email })
            })
            .catch(function (error) {

                console.log(error);
            })


    }, []);
    return (
        <div>
            <DashBoardNavbar />


            <div className="profile">
                <div className="profile_wrap">
                    <div className="titlte">
                        Profile
            </div>
                    <div className="input">
                        <TextField
                            id="outlined-secondary"
                            label="Name"
                            variant="outlined"
                            color="secondary"
                            value={input.name}
                            onChange={handleChange('name')}
                        />
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
                            label="Confirm Password"
                            type="password"
                            variant="outlined"
                            color="secondary"
                            value={input.password}
                            onChange={handleChange('password')}
                        />
                    </div>

                    <div className="btn-group">
                        <Button variant="contained" onClick={handleUpdate} color="secondary">
                            Update Profile
                </Button>
                        {alert && <Alert severity="error">
                            <AlertTitle>Error</AlertTitle>
                                This is an error alert — <strong>check it out!</strong>
                        </Alert>}
                        {success && <Alert severity="success">
                            <AlertTitle>Success</AlertTitle>
        Update profile successful! — <strong>check it out!</strong>
                        </Alert>}
                    </div>

                </div>
            </div>
        </div>
    );
}

export default Profile;
