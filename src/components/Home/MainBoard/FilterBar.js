import React from 'react';
import SearchIcon from '@material-ui/icons/Search';

const FilterBar = () => {
    return (
        <div className="filter-bar">
            <div className="filter-bar_wrap">
                <div className="filter-bar_search">
                    <div className="search_icon">
                        <SearchIcon />

                    </div>

                    <input className="search_txt" type="text" placeholder="Search" />
                </div>
            </div>
        </div>
    );
}

export default FilterBar;
