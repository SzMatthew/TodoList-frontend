import React, {useState} from 'react';
import Todo from './Todo/Todo';
import {AiOutlinePlus} from "react-icons/ai";
import {IconContext} from "react-icons";
import AddTodoPanel from './AddTodoPanel/AddTodoPanel';
import './Todolist.scss';


const Todolist = () => {
    const [todos, setTodos] = useState([
        {id: 3, priority: 4, done: false, text: "Correct all Hard Coded link"},
        {id: 0, priority: 1, done: false, text: "Wash the dishes",},
        {id: 2, priority: 3, done: false, text: "Add new Layer"},
        {id: 1, priority: 2, done: false, text: "Clean up the house"}
    ]);
    const [addTaskOpen, setAddTaskOpen] = useState(false);

    const sortedTodos = [...todos].sort((firstTodo, secondTodo) => (firstTodo.priority > secondTodo.priority) ? 1 : -1);    

    const SetTodoDone = (id) =>
    { 
        setTodos(todos.map(todo =>{ 
                if (todo.id === id)
                    todo.done = true;
                return todo;
            })
        );
    }; 

    const AddTodo = (newTodo, priority) => setTodos([...todos, {id: GetNextID(), text: newTodo, priority: priority, done: false}]);

    const GetNextID = () => {
        let maxId = 0;

        todos.map(todo => {
            if (todo.id > maxId)
            maxId = todo.id;
        });

        return maxId + 1;
    };

    return (
        <div className="todolist_panel">
            <div className="todolist-container">
                <h3 className="project-name">TODO List</h3>
                {
                    sortedTodos.filter(todo => todo.done === false).map(todo => (
                        <Todo key={todo.id} id={todo.id} text={todo.text} priority={todo.priority} onDoneClick={SetTodoDone} />
                    ))
                }
                {
                    addTaskOpen
                        ? <AddTodoPanel setAddTaskOpen={setAddTaskOpen} addTaskOpen={addTaskOpen} AddTodo={AddTodo}/>
                        : <div className={"add-task-label"} onClick={() => setAddTaskOpen(!addTaskOpen)}>
                            <div>
                                <IconContext.Provider value={{color: "#DE4C4A", size: "18px"}}>
                                    <div>
                                        <AiOutlinePlus />
                                    </div>
                                </IconContext.Provider>
                            </div>
                            <span>Add task</span> 
                        </div>
                }
            </div>
        </div>
    )
}

export default Todolist;