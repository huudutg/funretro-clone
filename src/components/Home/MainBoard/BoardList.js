import React, { useState, useEffect } from "react";

import AddCircleIcon from '@material-ui/icons/AddCircle';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import BoardItem from './BoardItem';
import axios from 'axios';
import DialogCreateBoard from "./DialogCreateBoard";
import Cookies from "js-cookie";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        border: 1,

    },
    t: {
        padding: theme.spacing(3),
        color: '#8E24AA',
        height: '80px'
    }
}));

const BoardList = () => {

    const classes = useStyles();
    const [lisBoard, setlisBoard] = useState([]);
    const [openDialog, setopenDialog] = useState(false)

    useEffect(() => {
        const temp = Cookies.get("token");
        axios.get(`dashboard/getByUid/${temp}`)
            .then(function (response) {

                setlisBoard(response.data);
                console.log('response.data', response.data)
            })
            .catch(function (error) {

                console.log(error);
            })


    }, []);



    return (
        <div className="boardlist">
            <div className="boardlist_wrap">

                <Grid container spacing={2}>

                    <Grid item sm={4} md={3} lg={2} onClick={() => setopenDialog(true)}>
                        <Paper className={classes.t}>
                            <AddCircleIcon fontSize="large" />
                            <span>Add board</span></Paper>
                    </Grid>
                    {lisBoard && lisBoard.map((board, index) =>
                        <BoardItem key={index} id={board._id} name={board.name} context={board.context} />
                    )}

                </Grid>
                {openDialog && <DialogCreateBoard onChange={(a) => setopenDialog(a)} />}
            </div>
        </div>
    );
}

export default BoardList;
