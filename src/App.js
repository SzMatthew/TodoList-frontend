import React from 'react';
import TodoList from './Components/Todo List/Todolist';
import { TodoListProvider } from './Contexts/todolist-context';
import { UserProvider } from './Contexts/user-context';
import { Switch, Route, Redirect } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Global.scss';

function App() {
  return (
    <UserProvider>
      <TodoListProvider>
        <Switch>
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
    </UserProvider>
  );
}

export default App;
