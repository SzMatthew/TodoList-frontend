import React from 'react';
import { AiOutlineEdit } from 'react-icons/ai';
import { IconContext } from 'react-icons';
import './SCSS/ProjectName.scss';

const ProjectName = ({ projectTitle, setProjectNameEditable }) => {
  return (
    <header className='header'>
      <h3 className='project-name'>{ projectTitle }</h3>
        <IconContext.Provider value={{ size: '24px', className: 'project-name-edit-icon' }}>
          <AiOutlineEdit onClick={() => setProjectNameEditable(true)}/>
        </IconContext.Provider>
    </header>
  );
};

export default ProjectName;