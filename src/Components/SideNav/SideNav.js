import React, {useEffect, useState} from 'react';
import {useUser} from '../../Contexts/user-context';
import {IconContext} from 'react-icons';
import {IoClose} from 'react-icons/io5';
import {useParams, useHistory} from 'react-router-dom';
import ProjectName from '../ProjectName/ProjectName';
import AddNewProject from '../AddNewProject/AddNewProject';
import './SideNav.scss';
import { toast } from 'react-toastify';

const SideNav = ({isOpen, setSideNavOpen}) => {
    const {state: {user}}         = useUser();
    const [projects, setProjects] = useState([]);
    const {projectId}             = useParams();
    const history                 = useHistory();

    useEffect(() => {
        getProjects();
    }, []);

    const getProjects = () => {
        fetch(`http://localhost:4000/projects?userId=${user.userId}`)
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

    const deleteProject = (projectIdToDelete) => {
        fetch('http://localhost:4000/projects/' + projectIdToDelete, {
            method: 'DELETE',
            headers: {'Content-type': 'application/json'},
        })
        .then(res => res.json())
            .then((data) => {
                if (data === true) {
                    if (projectId === projectIdToDelete) {
                        const location = {
                            pathname: '/projects',
                        };
                        history.replace(location);
                    }
                    getProjects();
                    toast.success('TodoList successfully deleted!');
                } else {
                    console.error(data);
                }
        })
        .catch((err) => {console.error(err);});
      };

    return (
        <nav className={isOpen ? 'navbar navbar--after_open' : 'navbar navbar--before_close'}>
            <IconContext.Provider value={{className: 'close-icon', size: '25px'}}>
                <IoClose onClick={() => setSideNavOpen(!isOpen)}/>
            </IconContext.Provider>
            <h3 className='project-label'>PROJECTS:</h3>
            <ul>
                {
                    projects.map(project => <ProjectName key={project._id} project={project} onDeleteProject={deleteProject}/>)
                }
                <AddNewProject appendNewProject={(project) => setProjects([...projects, project])}/>
            </ul>
        </nav>
    );
};

export default SideNav;
