import React from 'react';

import Dragdrop from './Dragdrop';

const BoardMain = ({ id, Item }) => {
    return (
        <div className="board-main">

            <Dragdrop id={id} Item={Item} />
        </div>
    );
}

export default BoardMain;
