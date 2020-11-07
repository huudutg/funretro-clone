import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
const config = require('../../config/default.json');
function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}
export default function FormDialog({ id }) {
    const [open, setOpen] = React.useState(false);

    const handleShare = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const [openAlert, setOpenAlert] = React.useState(false);



    const handleCloseAlert = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenAlert(false);
    };

    const handleCopy = (params) => {
        var copyText = document.getElementById("name");
        copyText.select();
        copyText.setSelectionRange(0, 99999)
        document.execCommand("copy");
        // alert("Copied the text: " + copyText.value);
        setOpen(false);

        setOpenAlert(true);


    }

    return (
        <div>
            <button className="btn-share" onClick={handleShare}>
                Share
                </button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Share Link</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Share this link to your friend for working together.
          </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Link Address"
                        type="text"
                        value={`${config.urld}/board/${id}`}
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleCopy} color="primary">
                        Copy Link
                    </Button>

                </DialogActions>
            </Dialog>
            <Snackbar open={openAlert} autoHideDuration={2000} onClose={handleCloseAlert}>
                <Alert onClose={handleCloseAlert} severity="success">
                    Copied to clipboard!
                         </Alert>
            </Snackbar>
        </div>
    );
}
