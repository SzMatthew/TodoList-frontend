import React from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import { IconContext } from 'react-icons';
import { RiDeleteBinLine } from 'react-icons/ri';
import './ProjectName.scss';

const ProjectName = ({ project, onDeleteProject }) => {
  const { projectId } = useParams();
  const history = useHistory();

  const handleProjectNameClick = () => {
    history.push(`/projects/${project._id}`);
  };

  const handleDeleteClick = () => {
    onDeleteProject(project._id);
  };

  return (
    <li className='project_list_item' onClick={handleProjectNameClick}>
      <span className={project._id === projectId ? 'active' : ''}>{project.title}</span>
      <IconContext.Provider value={{ size: '20px' }}>
        <RiDeleteBinLine onClick={handleDeleteClick}/>
      </IconContext.Provider>
    </li>
  );
};

export default ProjectName;