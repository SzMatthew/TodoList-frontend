import React from 'react';
import TodoList from './Components/Todo List/Todolist';
import { TodoListProvider } from './Contexts/todolist-context';
import { Switch, Route, Redirect } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Global.scss';

function App() {
  return (
    <TodoListProvider>
      <Switch>
        <Route exact path="/">
          <Redirect to="/projects/60b8e969e0bf012f64f4e354" />
        </Route>
        <Route path="/projects/:projectId">
          <TodoList/>
        </Route>
        <Route>

        </Route>
      </Switch>

      <ToastContainer autoClose={3000} newestOnTop theme="colored"/>
    </TodoListProvider>
  );
}

export default App;
