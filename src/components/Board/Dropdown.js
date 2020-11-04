import React, { useState, useRef, useEffect } from "react";
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

const Dropdown = () => {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);
    const wrapperRef = useRef(null);

    // below is the same as componentDidMount and componentDidUnmount
    useEffect(() => {
        document.addEventListener("click", handleClickOutside, false);
        return () => {
            document.removeEventListener("click", handleClickOutside, false);
        };
    }, []);

    const handleClickOutside = event => {
        if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
            setIsOpen(false);
        }
    };
    return (
        <div className="navbar_dropdown" ref={wrapperRef}>
            <div className="navbar_dropdown-wrap" onClick={toggle}>
                <span>Sort: created date</span>
                <ArrowDropDownIcon />
            </div>
            {isOpen && <div className="navbar_dropdown-content">
                <div className="dropdown-item">
                    <div className="item">Sort: order</div>
                    <div className="item">Sort: created date</div>
                    <div className="item">Sort: votes</div>
                </div>
            </div>}

        </div>
    );
};


export default Dropdown