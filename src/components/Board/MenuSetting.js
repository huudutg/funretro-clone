import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core/styles';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import RotateLeftIcon from '@material-ui/icons/RotateLeft';
import SettingsIcon from '@material-ui/icons/Settings';
import React, { useState } from 'react';
import DialogDeleteBoard from './DialogDeleteBoard';


const StyledMenu = withStyles({
    paper: {
        border: '1px solid #d3d4d5',
    },
})((props) => (
    <Menu
        elevation={0}
        getContentAnchorEl={null}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
        }}
        {...props}
    />
));

const StyledMenuItem = withStyles((theme) => ({
    root: {
        // '&:focus': {
        //     backgroundColor: theme.palette.primary.main,
        //     '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        //         color: theme.palette.common.white,
        //     },
        // },
    },
}))(MenuItem);

export default function MenuSetting({ id }) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [dialogSetting, setdialogSetting] = useState(false);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleDeleteBoard = () => {
        setdialogSetting(true)
    }
    const handleDeleteBoardClose = () => {
        setdialogSetting(false)
    }


    return (
        <div>
            <div className="icon icon-setting ">
                <SettingsIcon onClick={handleClick} />

            </div>

            <StyledMenu
                id="customized-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <StyledMenuItem>
                    <ListItemIcon>
                        <RotateLeftIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary="Reset all vote" />
                </StyledMenuItem>
                <StyledMenuItem>
                    <ListItemIcon>
                        <DeleteOutlineIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary="Delete all cards" />
                </StyledMenuItem>
                <StyledMenuItem onClick={handleDeleteBoard}>
                    <ListItemIcon>
                        <DeleteOutlineIcon fontSize="small" />
                        {dialogSetting && <DialogDeleteBoard id={id} onChange={handleDeleteBoardClose} />}
                    </ListItemIcon>
                    <ListItemText primary="Delete board" />
                </StyledMenuItem>
            </StyledMenu>
        </div>
    );
}
