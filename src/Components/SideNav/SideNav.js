import React, {useEffect, useState} from 'react';
import {IconContext} from "react-icons";
import {IoClose} from 'react-icons/io5';
import {Link} from "react-router-dom"
import './SideNav.scss';

const SideNav = ({isOpen, setSideNavOpen}) => {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        getProjects();
    });

    const getProjects = () => {
        fetch('http://localhost:4000/projects')
            .then(response => response.json())
            .then(data => {
                setProjects(data);
            })
    };
    
    return (
        <nav className={isOpen ? "navbar navbar--after_open" : "navbar navbar--before_close"}>
            <IconContext.Provider value={{className: "close-icon", size: "25px"}}>
                <IoClose onClick={() => setSideNavOpen(!isOpen)}/>
            </IconContext.Provider>
            <h3 className="project-label">PROJECTS:</h3>
            <ul>
                {
                    projects.map(project => <li className="project_list_item" key={project._id}><Link to={`/projects/${project.title}`}>{project.title}</Link></li>)
                }
            </ul>
        </nav>
    )
}

export default SideNav
