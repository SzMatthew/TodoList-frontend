import React, { useEffect } from 'react';
import { useUser } from '../../Contexts/user-context';
import { IconContext } from 'react-icons';
import { IoClose } from 'react-icons/io5';
import { useParams, useHistory } from 'react-router-dom';
import { useProjects } from '../../Contexts/projects-context';
import ProjectName from '../ProjectName/ProjectName';
import AddNewProject from '../AddNewProject/AddNewProject';
import './SideNav.scss';
import { toast } from 'react-toastify';

const SideNav = ({ isOpen, setSideNavOpen }) => {
  const { user } = useUser();
  const { projectId } = useParams();
  const history = useHistory();
  const { projects, setProjects } = useProjects();

  useEffect(() => {
    getProjects();
  }, []);

  const getProjects = () => {
    fetch(`${process.env.REACT_APP_BASE_URL}/projects?userId=${user.userId}`)
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
    fetch(`${process.env.REACT_APP_BASE_URL}/projects/${projectIdToDelete}`, {
      method: 'DELETE',
      headers: { 'Content-type': 'application/json' },
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
      <IconContext.Provider value={{ className: 'close-icon', size: '25px' }}>
        <IoClose onClick={() => setSideNavOpen(!isOpen)}/>
      </IconContext.Provider>
      <h3 className='project-label'>PROJECTS:</h3>
      {projects && (
        <ul>
          {
            projects.map(project =>
              <ProjectName
                key={project._id}
                project={project}
                onDeleteProject={deleteProject}
                setSideNavOpen={setSideNavOpen}
              />)
          }
          <AddNewProject />
        </ul>
      )}
    </nav>
  );
};

export default SideNav;
