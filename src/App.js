import TodoList from './Components/Todo List/Todolist';
import { TodoListProvider } from './Contexts/todolist-context';
import { Switch, Route, Redirect } from 'react-router-dom';
import './Global.scss';

function App() {
  return (
    <TodoListProvider>
      <Switch>
        <Route exact path="/">
          <Redirect to="/projects/60b8e95be0bf012f64f4e353" />
        </Route>
        <Route path="/projects/:projectId">
          <TodoList/>
        </Route>
        <Route>
            
        </Route>
      </Switch>
    </TodoListProvider>
  );
}

export default App;
