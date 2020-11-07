import AccessAlarmIcon from '@material-ui/icons/AccessAlarm';
import VisibilityIcon from '@material-ui/icons/Visibility';
import axios from 'axios';
import Pusher from 'pusher-js';
import React, { useEffect, useRef, useState } from "react";
import DialogShare from './DialogShare';
import MenuSetting from './MenuSetting';


const BoardTitle = ({ id, name, context }) => {
    const [saveName, setsaveName] = useState(false);
    const [board, setBoard] = useState({});
    const typingRef = useRef(null)
    Pusher.logToConsole = true;


    var pusher = new Pusher('fc572aa65b3feee3d449', {
        cluster: 'ap1'
    });

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
        }, 600)
    }
    const channel = pusher.subscribe('fun');
    useEffect(() => {
        channel.bind('title', function (data) {
            setBoard({ name: data.name, context: data.context })

        });
    }, []);

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


                <DialogShare id={id} />
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
