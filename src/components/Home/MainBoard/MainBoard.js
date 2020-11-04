import React from 'react';
import BoardList from './BoardList';
import Description from './Description';
import FilterBar from './FilterBar';

const MainBoard = () => {
    return (
        <div className="mainboard">
            <div className="mainboard_wrap">
                <div className="mainboard_title">
                    My Boards
                </div>

                <FilterBar />
                <Description />
                <BoardList />
            </div>

        </div>
    );
}

export default MainBoard;
