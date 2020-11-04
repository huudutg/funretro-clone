import React, { useState, useEffect } from 'react'
import Navbar from './Navbar'
import BoardTitle from './BoardTitle';
import BoardMain from './BoardMain/BoardMain';
import {
    useParams
} from "react-router-dom";
import axios from 'axios';
import Skeleton from '@material-ui/lab/Skeleton';

function Board() {
    const { id } = useParams();
    const [board, setboard] = useState({})
    useEffect(() => {
        console.log('iaaaaaaaaad', id)
        axios({
            method: 'get',
            url: `/dashboard/${id}`,
        })
            .then(function (response) {
                console.log('board', response)

                setboard({ ...response.data })
            })
            .catch(function (error) {
                console.log(error);
            });;
    }, []);
    return (
        <div>


            {board ? (
                <div className="board">

                    <Navbar />
                    <BoardTitle id={id} name={board.name} context={board.context} />
                    <BoardMain id={id} Item={board.Item} />

                </div>
            ) : (
                    <div styles={{ textAlign: "center" }}>
                        <Skeleton variant="text" />
                        <Skeleton variant="circle" width={200} height={200} />
                        <Skeleton variant="rect" width={1300} height={800} />
                    </div>
                )}
        </div>
    )
}

export default Board
