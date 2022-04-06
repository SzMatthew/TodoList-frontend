import React, { useState } from 'react';
import {useUser} from '../../Contexts/user-context';
import {IconContext} from 'react-icons';
import {AiOutlinePlus} from 'react-icons/ai';
import { toast } from 'react-toastify';
import './AddNewProject.scss';

const AddNewProject = ({appendNewProject}) => {
  const {state: {user}} = useUser();
  const [isNewProjectNameInputVisible, setIsNewProjectNameInputVisible] = useState(false);
  const [isNewProjectNameValid, setIsNewProjectNameValid] = useState(true);

  const createProject = (projectName) => {
    const project = {
      userId: user.userId,
      title: projectName
    };

    fetch('http://localhost:4000/projects/insertProject', {
      method: 'POST',
      headers: {'Content-type': 'application/json'},
      body: JSON.stringify(project)
    })
      .then(response => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error('Something went wrong!');
          }
      })
      .then(data => {
        appendNewProject(data);
          toast.success('Todolist added successfully!');
      })
      .catch((error) => {
          console.error(`There is no available database: ${error}`);
      });
  };

  const handleKeydown = (event) => {
    if (event.key === 'Enter') {
      if (!event.target.value) {
        setIsNewProjectNameValid(false);
      } else {
        createProject(event.target.value);
        setIsNewProjectNameInputVisible(false);
        setIsNewProjectNameValid(true);
      }
    }
  };

  const handleBur = (event) => {
    event.target.value = '';
    setIsNewProjectNameInputVisible(false);
  };

  return (
    <li className='add-new-project-item' onClick={() => setIsNewProjectNameInputVisible(true)} onBlur={handleBur}>
      {
        isNewProjectNameInputVisible
          ? <input type='text' className={isNewProjectNameValid ? '' : 'red-border'} autoFocus onKeyDown={handleKeydown}/>
          : <>
              <IconContext.Provider value={{color: '#DE4C4A', size: '24px'}}>
                  <AiOutlinePlus />
              </IconContext.Provider>
              <span className='add-new-project-name-label'>Add New TodoList!</span>
            </>
      }
    </li>
  );
};

export default AddNewProject;