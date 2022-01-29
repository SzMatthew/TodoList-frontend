import React, {useEffect, useState} from 'react';
import {IconContext} from 'react-icons';
import {IoClose} from 'react-icons/io5';
import {Link, useParams} from 'react-router-dom';
import ProjectName from '../ProjectName/ProjectName';
import './SideNav.scss';

const SideNav = ({isOpen, setSideNavOpen}) => {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        getProjects();
    });

    const getProjects = () => {
        fetch('http://localhost:4000/projects')
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Something went wrong!');
                }
            })
            .then(data => {
                setProjects(data);
            })
            .catch((error) => {
                console.error(`There is no available database: ${error}`);
            });
    };

    return (
        <nav className={isOpen ? 'navbar navbar--after_open' : 'navbar navbar--before_close'}>
            <IconContext.Provider value={{className: 'close-icon', size: '25px'}}>
                <IoClose onClick={() => setSideNavOpen(!isOpen)}/>
            </IconContext.Provider>
            <h3 className='project-label'>PROJECTS:</h3>
            <ul>
                {
                    projects.map(project => <ProjectName key={project._id} project={project}/>)
                }
            </ul>
        </nav>
    );
};

export default SideNav;
