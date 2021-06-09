import TodoList from './Components/Todo List/Todolist';
import { Switch, Route, Redirect } from 'react-router-dom';
import './Global.scss';

function App() {
  return (
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
  );
}

export default App;
