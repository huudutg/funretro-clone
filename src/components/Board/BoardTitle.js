import React, { useState, useEffect, useRef } from "react";
import Button from '@material-ui/core/Button';
import axios from 'axios';
import VisibilityIcon from '@material-ui/icons/Visibility';
import AccessAlarmIcon from '@material-ui/icons/AccessAlarm';
import SettingsIcon from '@material-ui/icons/Settings';
import MenuSetting from './MenuSetting';

const BoardTitle = ({ id, name, context }) => {
    const [saveName, setsaveName] = useState(false);
    const [board, setBoard] = useState({});
    const typingRef = useRef(null)


    const handleNameClick = (params) => {
        setsaveName(true)
    }
    const handleCancel = (params) => {
        setsaveName(false)

    }
    const handleSave = (e) => {
        boardChange({ name: board.name })
        setsaveName(false)
    }
    const boardChange = (a) => {
        axios({
            method: 'post',
            url: `/dashboard/edit/${id}`,
            data: a
        })
            .then(function (response) {
                console.log('board', response)

            })
            .catch(function (error) {
                console.log(error);
            });;
    }

    const handleContextChange = (e) => {
        const value = e.target.value;
        setBoard({ ...board, context: value })
        if (typingRef.current) {
            clearTimeout(typingRef.current)

        }
        typingRef.current = setTimeout(() => {
            const board = {
                context: value
            }
            boardChange(board)
            console.log('board', board)
        }, 600)
    }



    useEffect(() => {
        setBoard({ name, context })
    }, [name, context]);
    return (
        <div className="board_title">
            <div className="left">
                <div className="title_wrap">
                    <div className="title_wrap-input">
                        <input value={board.name} onChange={e => setBoard({ ...board, name: e.target.value })} onClick={handleNameClick} type="text" className="name" />
                    </div>
                    {saveName && <div className="title_wrap-btn">
                        <button className="save" onClick={handleSave}>
                            Save
                        </button>
                        <button className="cancel" onClick={handleCancel}>
                            Cancel
                        </button>
                    </div>}
                    <div className="title_wrap-context">
                        <input value={board.context} onChange={handleContextChange} type="text" className="context" />

                    </div>
                </div>
            </div>
            <div className="right">
                <div className="icon">
                    <VisibilityIcon />
                </div>
                <div className="icon">
                    <AccessAlarmIcon />
                </div>

                <button className="btn-share">
                    Share
                </button>
                <button className="btn-new">
                    New column
                </button>
                <div className="icon" >


                    <MenuSetting id={id} />
                </div>
            </div>
        </div>);
};

export default BoardTitle;
