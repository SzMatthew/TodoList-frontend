import React, {useState} from 'react';
import './Todolist.scss';
import '../Global.scss';
import Todo from './Todo/Todo';
import {AiOutlinePlus} from "react-icons/ai";
import {IconContext} from "react-icons";
import classNames from "classnames";

const Todolist = () => {
    const [todos, setTodos] = useState([
        {id: 0, text: "Wash the dishes", priority: 1, done: false},
        {id: 1, text: "Clean up the house", priority: 2, done: false},
        {id: 2, text: "Add new Layer", priority: 3, done: false},
        {id: 3, text: "Correct all Hard Coded link", priority: 0, done: false}
    ]);
    const [addTaskOpen, setAddTaskOpen] = useState(false);
    const [newTodo, setNewTodo] = useState('');

    const HandleTodoDone = (id) =>
    { 
        setTodos(todos.map(todo =>{ 
                if (todo.id === id)
                    todo.done = true;
                return todo;
            })
        );
    }; 

    const AddTodo = () => {
        setTodos([...todos, {id: 10, text: newTodo, priority: 3, done: false}]);
        setNewTodo('');
    };

    return (
        <div className="todolist_panel">
            <div className="todolist-container">
                <h3 className="project-name">TODO List</h3>
                {
                    todos.filter(todo => todo.done === false).map( todo => (
                        <Todo key={todo.id} id={todo.id} text={todo.text} priority={todo.priority} onDoneClick={HandleTodoDone}/>
                    ))
                }
                <div className={classNames("add-task-label", addTaskOpen ? 'hidden' : 'visible')} onClick={() => setAddTaskOpen(!addTaskOpen)}>
                    <div>
                        <IconContext.Provider value={{color: "#DE4C4A", size: "18px"}}>
                            <div>
                                <AiOutlinePlus />
                            </div>
                        </IconContext.Provider>
                    </div>
                    <span>Add task</span> 
                </div>
                <div className={addTaskOpen? 'visible' : 'hidden'}>
                    <input type="text" placeholder="e.g. Learn Portugese every 2 days #Learning" value={newTodo} onChange={(event) => setNewTodo(event.target.value)}/>
                    <button type="button" className="red" onClick={AddTodo}>Add Task</button>
                    <button type="button" onClick={() => setAddTaskOpen(!addTaskOpen)}>Cancel</button>
                </div>
            </div>
        </div>
    )
}

export default Todolist;