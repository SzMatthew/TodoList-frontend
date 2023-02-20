import React, { useEffect } from 'react';
import TodoList from './Components/Todo List/Todolist';
import Login from './Components/Login/Login';
import { useUser } from './Contexts/user-context';
import { TodoListProvider } from './Contexts/todolist-context';
import { Switch, Route, Redirect, useHistory } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Global.scss';

const App = () => {
  const history = useHistory();
  const { user } = useUser();

  useEffect(() => {
    if (!user) {
      history.push('/login');
    }
  }, [user]);

  return (
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

  );
};

export default App;
