import React from 'react'
import Logo from '../../img/logo.png';
import Cookies from "js-cookie";
import { useHistory } from "react-router-dom";

import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import MenuUser from './MenuUser';
function DashBoardNavbar() {
    let history = useHistory();

    const handleClick = (params) => {
        history.push(`/`);

    }

    return (
        <div className="dashboard-nav">
            <div className="dashboard-nav-wrap">
                <img src={Logo} onClick={handleClick} alt="a" />
                <div className="navbar-avatar">
                    {/* <AccountCircleIcon onClick={handleClick} /> */}
                    <MenuUser />
                </div>

            </div>

        </div>
    )
}

export default DashBoardNavbar
