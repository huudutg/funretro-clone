import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import axios from 'axios';
import { useHistory } from "react-router-dom";

const DialogCreateBoard = ({ onChange }) => {
    let history = useHistory();

    const [board, setBoard] = useState({
        name: '',
        context: "",
        Item: [[], [], []]
    })

    const handleClose = () => {
        onChange(false)
        // setOpen(false);
    };
    const handleCreate = () => {
        const data = { ...board }
        axios({
            method: 'post',
            url: '/dashboard/createBoard',
            data,
            withCredentials: true
        })
            .then(function (response) {
                const id = response.data._id;
                history.push(`/board/${id}`);
            })
            .catch(function (error) {
                console.log(error);
            });;




        onChange(false)
        // setOpen(false);
    };

    const [state, setState] = React.useState({
        gilad: false,
        jason: false,
        antoine: false,
    });

    const handleChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked });
    };

    const handleNameChange = (event) => {
        setBoard({ ...board, name: event.target.value });
    };

    const { gilad, jason, antoine } = state;

    return (
        <div className="dialog-create-board">

            <Dialog open={true} onClose={handleClose}
                aria-labelledby="form-dialog-title">
                <DialogTitle className="dialog-title" id="form-dialog-title">Create Board</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        size='medium'
                        id="name"
                        label="Name"
                        type="text"
                        fullWidth
                        value={board.name}
                        onChange={handleNameChange}

                    />
                    <TextField
                        margin="dense"
                        id="name"
                        label="Max votes per user(whole board)"
                        type="number"
                        fullWidth

                    />
                    <div className="template">
                        Template
                    </div>
                    <div className="btn-option">
                        <Button className="left" variant="outlined" color="secondary" >
                            Existing Template
                        </Button>
                        <Button variant="outlined" color="secondary" >
                            Custom Template
                        </Button>
                    </div>
                    <div className="option">
                        <FormGroup>
                            <FormControlLabel
                                control={<Checkbox checked={gilad} onChange={handleChange} name="gilad" />}
                                label="Hide cards initially"
                            />
                            <FormControlLabel
                                control={<Checkbox checked={jason} onChange={handleChange} name="jason" />}
                                label="Disable voting initially"
                            />
                            <FormControlLabel
                                control={<Checkbox checked={antoine} onChange={handleChange} name="antoine" />}
                                label="Hide vote count"
                            />
                            <FormControlLabel
                                control={<Checkbox checked={antoine} onChange={handleChange} name="antoine" />}
                                label="Show card's author"
                            />
                        </FormGroup>
                    </div>
                    <div className="btn-confirm">
                        <Button onClick={handleCreate} variant="contained" color="secondary">
                            CREATE
                        </Button>
                    </div>

                </DialogContent>

            </Dialog>
        </div>
    );
}

export default DialogCreateBoard;
