import React from 'react';
import {IconContext} from "react-icons";
import {IoClose} from 'react-icons/io5';
import {Link} from "react-router-dom"
import './SideNav.scss';

const SideNav = ({isOpen, setSideNavOpen}) => {
    
    return (
        <nav className={isOpen ? "navbar navbar--after_open" : "navbar navbar--before_close"}>
            <IconContext.Provider value={{className: "close-icon", size: "24px"}}>
                <IoClose onClick={() => setSideNavOpen(!isOpen)}/>
            </IconContext.Provider>
            <h3>PROJECTS:</h3>
            <ul>
                <li>
                    <Link to={`/projects/all`}>ALL</Link>
                </li>
            </ul>
        </nav>
    )
}

export default SideNav
