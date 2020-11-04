import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import { useHistory } from "react-router-dom";
import axios from 'axios';


import Slide from '@material-ui/core/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide({ onChange, id }) {
    const [open, setOpen] = React.useState(true);
    let history = useHistory();

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleAgree = (params) => {
        axios({
            method: 'post',
            url: `/dashboard/delete/${id}`,
        })
            .then(function (response) {
                console.log('board', response)
                if (response.status == 200) {
                    history.push(`/`);

                }
                else {
                    console.log('response', response)
                }

            })
            .catch(function (error) {
                console.log(error);
            });
        handleClose()
    }

    const handleClose = () => {
        setOpen(false);
        onChange()
    };

    return (
        <div>

            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle id="alert-dialog-slide-title">{"Do you want to delete this board?"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        Sau khi xoá bảng, tất cả dữ liệu trong bảng mà bạn đã tạo sẽ bị mất.
                        Bạn có chắc muốn xoá?
          </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
          </Button>
                    <Button onClick={handleAgree} color="primary">
                        Delete
          </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
