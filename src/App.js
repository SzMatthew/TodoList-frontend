import TodoList from './Components/Todo List/Todolist';
import { Switch, Route, Redirect } from 'react-router-dom';
import './Global.scss';

function App() {
  return (
    <Switch>
      <Route exact path="/">
        <Redirect to="/projects/:projectName" />
      </Route>
      <Route path="/projects/:projectName">
        <TodoList/>
      </Route>
      <Route>
          
      </Route>
    </Switch>
  );
}

export default App;
