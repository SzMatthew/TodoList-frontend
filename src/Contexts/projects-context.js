import React, { createContext, useContext, useMemo, useState } from 'react';

const ProjectContext = createContext();

const initialeState = {
  projects: [],
  isDeleteProjectModalOpen: false,
};

const ProjectsProvider = props => {
  const [state, setState] = useState(initialeState);
  const value = useMemo(() => [state, setState], [state]);
  return <ProjectContext.Provider value={value} {...props} />;
};

const useProjects = () => {
  const [state, setState] = useContext(ProjectContext);


  const setProjects = (projects) => {
    setState({ ...state, projects });
  };

  const setDeleteProjectModalOpen = (open) => {
    setState({ ...state, isDeleteProjectModalOpen: open });
  };

  const addNewProject = (newProject) => {
    const projects = [...state.projects, newProject];
    setState({ ...state, projects });
  };

  return {
    projects: state.projects,
    isDeleteProjectModalOpen: state.isDeleteProjectModalOpen,
    setProjects,
    addNewProject,
    setDeleteProjectModalOpen
  };
};

export { useProjects, ProjectsProvider };