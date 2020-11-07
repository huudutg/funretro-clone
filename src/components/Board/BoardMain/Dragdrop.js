import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import axios from 'axios';
import Pusher from 'pusher-js';
import React, { useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import ReactDOM from "react-dom";

// fake data generator
// const getItems = (count, offset = 0) =>
//     Array.from({ length: count }, (v, k) => k).map(k => ({
//         id: `item-${k + offset}-${new Date().getTime()}`,
//         content: `item ${k + offset}`
//     }));

const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};

/**
 * Moves an item from one list to another list.
 */
const move = (source, destination, droppableSource, droppableDestination) => {
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const [removed] = sourceClone.splice(droppableSource.index, 1);

    destClone.splice(droppableDestination.index, 0, removed);

    const result = {};
    result[droppableSource.droppableId] = sourceClone;
    result[droppableDestination.droppableId] = destClone;

    return result;
};
const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: "none",
    padding: grid * 2,
    margin: `0 0 ${grid}px 0`,

    // change background colour if dragging
    background: isDragging ? "lightgreen" : "grey",

    // styles we need to apply on draggables
    ...draggableStyle
});
const getListStyle = isDraggingOver => ({
    background: isDraggingOver ? "lightblue" : "lightgrey",
    padding: grid,
    width: 250
});

export default function QuoteApp({ id, Item }) {
    const [state, setState] = useState([[], [], []]);
    // const [state, setState] = useState([getItems(10), getItems(1, 10), getItems(5, 15)]);
    const [addOpen, setaddOpen] = useState([false, false, false])
    Pusher.logToConsole = true;


    var pusher = new Pusher('fc572aa65b3feee3d449', {
        cluster: 'ap1'
    });


    function onDragEnd(result) {
        const { source, destination } = result;

        // dropped outside the list
        if (!destination) {
            return;
        }
        const sInd = +source.droppableId;
        const dInd = +destination.droppableId;

        if (sInd === dInd) {
            const items = reorder(state[sInd], source.index, destination.index);
            const newState = [...state];
            newState[sInd] = items;
            setState(newState);
            postState(newState)
        } else {
            const result = move(state[sInd], state[dInd], source, destination);
            const newState = [...state];
            newState[sInd] = result[sInd];
            newState[dInd] = result[dInd];

            setState(newState);
            postState(newState)

        }
    }

    const handleAdd = (stt) => {
        const newAdd = { ...addOpen };
        newAdd[stt] = true;
        setaddOpen(newAdd);
        document.getElementById(`add-wrap${stt}`).style.display = 'flex'
    }
    const handleAddBtn = (stt) => {


        const t = document.getElementById(`add${stt}`).value
        const item = {
            id: `item-${stt}-${new Date().getTime()}`,
            content: t
        }
        const newState = [...state];
        newState[stt] = [item, ...newState[stt]];
        setState(newState)
        postState(newState)
        document.getElementById(`add-wrap${stt}`).style.display = 'none'
        document.getElementById(`add${stt}`).value = ''


    }
    const handleEdit = (ind, index, item) => {
        const c = document.getElementById(`input${ind}-${index}`);
        c.value = item.content;
        const b = document.getElementById(`edit${ind}-${index}`);
        b.style.display = 'flex';
        const d = document.getElementById(`wrap${ind}-${index}`);
        d.style.display = 'none';


    }
    const handleSave = (ind, index) => {
        const c = document.getElementById(`input${ind}-${index}`).value;

        const newState = [...state];
        newState[ind][index].content = c
        setState(newState);
        postState(newState)
        const b = document.getElementById(`edit${ind}-${index}`);
        b.style.display = 'none';
        document.getElementById(`wrap${ind}-${index}`).style.display = '';
    }
    const channel = pusher.subscribe('fun');


    useEffect(() => {
        channel.bind('id', function (data) {
            setState(data)
        });
    }, []);



    const postState = (data) => {
        axios({
            method: 'post',
            url: `/dashboard/edit/${id}`,
            data: { Item: data }
        })
            .then(function (response) {

            })
            .catch(function (error) {
                console.log(error);
            });;
    }


    useEffect(() => {
        if (id) {
            axios({
                method: 'get',
                url: `/dashboard/${id}`,
            })
                .then(function (response) {
                    setState(response.data.Item)

                })
                .catch(function (error) {
                    console.log(error);
                });;
        }

    }, [id]);

    return (
        <div>

            <div className="dragdrop-main">
                <div className="dragdrop-wrap">
                    <div className="dragdrop_header">
                        <div className="dragdrop_header-wrap">
                            <div className="wentwell">
                                <div className="title">
                                    <div className="square" style={{ backgroundColor: "#009688" }}></div>
                                    <div className="name">Went well</div>
                                </div>
                                <div className="add-btn" onClick={() => handleAdd(0)}>
                                    <button>
                                        +
                                    </button>
                                </div>
                            </div>
                            <div className="wentwell">
                                <div className="title">
                                    <div className="square" style={{ backgroundColor: "#E91E63" }}></div>
                                    <div className="name">To Improve</div>
                                </div>
                                <div className="add-btn" onClick={() => handleAdd(1)}>
                                    <button>
                                        +
                                    </button>
                                </div>
                            </div>
                            <div className="wentwell">
                                <div className="title">
                                    <div className="square" style={{ backgroundColor: "#9C27B0" }}></div>
                                    <div className="name">Action Items</div>
                                </div>
                                <div className="add-btn" onClick={() => handleAdd(2)}>
                                    <button>
                                        +
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='dragdrop'>
                        <DragDropContext onDragEnd={onDragEnd}>
                            {

                                state && state.map((el, ind) => (
                                    <Droppable key={ind} droppableId={`${ind}`}>
                                        {(provided, snapshot) => (
                                            <div
                                                className={`drag${ind} item`}
                                                ref={provided.innerRef}
                                                style={getListStyle(snapshot.isDraggingOver)}
                                                {...provided.droppableProps}
                                            >
                                                {
                                                    <div className="card_content-edit add-wrap" id={`add-wrap${ind}`} >
                                                        <div className="add-card">
                                                            <input className="search_txt" id={`add${ind}`} type="text" />
                                                            <div className="btn-edit">
                                                                <button
                                                                    className="save"
                                                                    type="button"
                                                                    onClick={() => handleAddBtn(ind)}
                                                                >
                                                                    DONE
                                                                </button>

                                                                <DeleteForeverIcon

                                                                />

                                                            </div>
                                                        </div>


                                                    </div>}
                                                {el.map((item, index) => (
                                                    <Draggable
                                                        key={item.id}
                                                        draggableId={item.id}
                                                        index={index}
                                                    >
                                                        {(provided, snapshot) => (
                                                            <div className="card-wrap">
                                                                <div
                                                                    className="card"
                                                                    ref={provided.innerRef}
                                                                    {...provided.draggableProps}
                                                                    {...provided.dragHandleProps}
                                                                    style={getItemStyle(
                                                                        snapshot.isDragging,
                                                                        provided.draggableProps.style
                                                                    )}
                                                                >
                                                                    <div

                                                                        className="card_content"

                                                                    >   <div className="card-wrap" id={`wrap${ind}-${index}`}>
                                                                            <div className="card_content-wrap" >
                                                                                <div className="content"> {item.content}</div>
                                                                                <div className="btn-edit">
                                                                                    <EditIcon onClick={() => handleEdit(ind, index, item)} />

                                                                                </div>
                                                                                {/* <button onClick={() => handleEdit(ind, index, item)}>edit</button> */}
                                                                            </div>
                                                                            <div className="like">
                                                                                <ThumbUpAltIcon />
                                                                                <div className="text-like">0</div>
                                                                                <ChatBubbleIcon />
                                                                                <div className="text-like">0</div>

                                                                            </div>
                                                                        </div>
                                                                        <div className="card_content-edit" id={`edit${ind}-${index}`}>
                                                                            <input className="search_txt" id={`input${ind}-${index}`} type="text" />
                                                                            <div className="btn-edit">
                                                                                <button
                                                                                    className="save"
                                                                                    type="button"
                                                                                    onClick={() => handleSave(ind, index)}
                                                                                >
                                                                                    DONE
                                                                </button>

                                                                                <DeleteForeverIcon
                                                                                    onClick={() => {
                                                                                        const newState = [...state];
                                                                                        newState[ind].splice(index, 1);
                                                                                        setState(newState);
                                                                                        postState(newState);
                                                                                        const b = document.getElementById(`edit${ind}-${index}`);
                                                                                        b.style.display = 'none';
                                                                                        document.getElementById(`wrap${ind}-${index}`).style.display = '';
                                                                                    }}
                                                                                />

                                                                            </div>

                                                                        </div>



                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )}
                                                    </Draggable>
                                                ))}
                                                {provided.placeholder}
                                            </div>
                                        )}
                                    </Droppable>
                                ))}
                        </DragDropContext>
                    </div>
                </div>
            </div>
        </div >
    );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<QuoteApp />, rootElement);
