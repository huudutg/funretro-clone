import React from 'react';
import ToImprove from './ToImprove';
import WentWell from './WentWell';
import ActionItems from './ActionItems';
import Dragdrop from './Dragdrop';

const BoardMain = ({ id, Item }) => {
    return (
        <div className="board-main">
            {/* <WentWell />
            <ToImprove />
            <ActionItems /> */}
            <Dragdrop id={id} Item={Item} />
        </div>
    );
}

export default BoardMain;
