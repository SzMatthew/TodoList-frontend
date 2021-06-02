import React from 'react';
import {IconContext} from "react-icons";
import {IoClose} from 'react-icons/io5';
import './SideNav.scss';

const SideNav = ({isOpen, setSideNavOpen}) => {
    
    return (
        <nav className={isOpen ? "navbar navbar--after_open" : "navbar navbar--before_close"}>
            <IconContext.Provider value={{className: "close-icon", size: "24px"}}>
                <IoClose onClick={() => setSideNavOpen(!isOpen)}/>
            </IconContext.Provider>
            <div>ASDASD</div>
            <div>ASDASD</div>
            <div>ASDASD</div>
            <div>ASDASD</div>
            <div>ASDASD</div>
        </nav>
    )
}

export default SideNav
