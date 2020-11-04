import React from 'react'
import Logo from '../../img/logo.png';
import SearchIcon from '@material-ui/icons/Search';
import ViewColumnIcon from '@material-ui/icons/ViewColumn';
import ReorderIcon from '@material-ui/icons/Reorder';
import StarIcon from '@material-ui/icons/Star';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Dropdown from './Dropdown';
import {
    Link,
} from "react-router-dom";
function Navbar() {

    return (
        <div className="navbar">
            <div className="navbar-wrap">
                <Link to="/" >
                    <img src={Logo} alt="a" />

                </Link>
                <div className="navbar_element">
                    <div className="navbar_element-left">
                        <div className="navbar_search">
                            <div className="search_icon">
                                <SearchIcon />

                            </div>

                            <input className="search_txt" type="text" placeholder="Search" />
                        </div>
                        <Dropdown />
                        <div className="navbar_layout">
                            <div className="navbar_layout-wrap">
                                <span>Layout</span>
                                <ViewColumnIcon className="icon-one" />
                                <ReorderIcon />
                            </div>

                        </div>


                    </div>
                    <div className="navbar_element-right">
                        <div className="navbar_element-right-wrap">
                            <div className="navbar_level">
                                <StarIcon />
                                <span>Prime Directive</span>

                            </div>
                            <div className="navbar-avatar">
                                <AccountCircleIcon />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Navbar
