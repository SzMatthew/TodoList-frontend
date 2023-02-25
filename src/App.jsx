import React, { useEffect } from 'react';
import TodoList from './Components/Todo List/Todolist';
import Login from './Components/Login/Login';
import { useUser } from './Contexts/user-context';
import { TodoListProvider } from './Contexts/todolist-context';
import { ProjectsProvider } from './Contexts/projects-context';
import { Switch, Route, Redirect, useHistory } from 'react-router-dom';
import Cookies from 'js-cookie';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import jwt_decode from 'jwt-decode';

import './Global.scss';

const App = () => {
  const history = useHistory();
  const { user, setUser } = useUser();

  useEffect(() => {
    const userInCookies = JSON.parse(Cookies.get('user') ?? null);

    if (!user && !userInCookies) {
      history.push('/login');
    } else if (userInCookies) {
      setUser(jwt_decode(userInCookies.credential));
    }
  }, []);

  return (
    <ProjectsProvider>
      <TodoListProvider>
        <Switch>
          <Route exact path="/login">
            <Login/>
          </Route>
          <Route exact path="/">
            <Redirect to="/projects" />
          </Route>
          <Route path="/projects/:projectId?">
            <TodoList/>
          </Route>
          <Route>
            <span>Invalid Route</span>
          </Route>
        </Switch>

        <ToastContainer autoClose={3000} newestOnTop theme="colored"/>
      </TodoListProvider>
    </ProjectsProvider>
  );
};

export default App;
