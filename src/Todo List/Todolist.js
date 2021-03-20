import React, {useEffect, useState} from 'react';
import Todo from './Todo/Todo';
import {AiOutlinePlus} from "react-icons/ai";
import {IconContext} from "react-icons";
import AddTodoPanel from './AddTodoPanel/AddTodoPanel';
import './Todolist.scss';


const Todolist = () => {
    const [todos, setTodos] = useState([]);
    const [addTaskOpen, setAddTaskOpen] = useState(false);

    const sortedTodos = [...todos].sort((firstTodo, secondTodo) => (firstTodo.priority > secondTodo.priority) ? 1 : -1);

    useEffect(() => {
        getTodos();
    }, []);

    const getTodos = () => {
        fetch('http://localhost:4000/todos')
            .then(response => response.json())
            .then(data => {
                setTodos(data)
                if (todos.filter(todo => todo.done === false).length === 0) {
                    setAddTaskOpen(true);
                }
            })
    };

    const insertTodo = (newTodo, priority) => {
        let todo = {
            text: newTodo,
            priority: priority,
            done: false
        };

        console.log('todo', todo);

        fetch('http://localhost:4000/todos', {
            method: 'POST',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify(todo)
        })
            .then(res => res.json())
            .then((data) => {
                if (data._id) {
                    getTodos();
                }
            })
            .catch((err) => {console.error(err)})
    };

    
    const updateTodoDone = (id) => {
        let todoToUpdate = null;

        todos.map(todo => { 
            if (todo._id === id) {
                todo.done = true;
                todoToUpdate = todo;
            } 
        });

        fetch('http://localhost:4000/todos', {
            method: 'PUT',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify(todoToUpdate)
        })
            .then(res => res.json())
            .then((data) => {
                getTodos();
            })
            .catch((err) => {console.error(err)})
    }

    return (
        <div className="todolist_panel">
            <div className="todolist-container">
                <h3 className="project-name">TODO List</h3>
                {
                    sortedTodos.filter(todo => todo.done === false).map(todo => (
                        <Todo key={todo._id} id={todo._id} text={todo.text} priority={todo.priority} onDoneClick={updateTodoDone} />
                    ))
                }
                {
                    addTaskOpen
                        ? <AddTodoPanel setAddTaskOpen={setAddTaskOpen} addTaskOpen={addTaskOpen} AddTodo={insertTodo}/>
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