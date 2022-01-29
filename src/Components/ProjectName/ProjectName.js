import React from 'react';
import {Link} from 'react-router-dom';
import './ProjectName.scss';

const ProjectName = ({projectId, project}) => {
  return (
    <li className='project_list_item'>
      <Link className={project._id === projectId ? 'active' : ''} to={`/projects/${project._id}`}>{project.title}</Link>
    </li>
  );
};

export default ProjectName;