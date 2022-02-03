import React from 'react';
import {Link, useParams} from 'react-router-dom';
import {IconContext} from 'react-icons';
import {RiDeleteBinLine} from 'react-icons/ri';
import './ProjectName.scss';

const ProjectName = ({ project, onDeleteProject }) => {
  const { projectId } = useParams();

  return (
    <li className='project_list_item'>
      <Link className={project._id === projectId ? 'active' : ''} to={`/projects/${project._id}`}>{project.title}</Link>
      <IconContext.Provider value={{size: '20px'}}>
        <RiDeleteBinLine onClick={() => onDeleteProject(project._id)}/>
      </IconContext.Provider>
    </li>
  );
};

export default ProjectName;