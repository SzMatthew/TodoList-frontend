import React, {Component} from 'react';
import './Todolist.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import Todo from './Todo/Todo';
import {AiOutlinePlus} from "react-icons/ai";
import { IconContext } from "react-icons";

class Todolist extends Component
{   
    constructor ()
    {
        super();
        this.state = {
            'todos': [{id: 0, text: "Wash the dishes", priority: 1, done: false},
            {id: 1, text: "Clean up the house", priority: 2, done: false},
            {id: 2, text: "Add new Layer", priority: 3, done: false},
            {id: 3, text: "Correct all Hard Coded link", priority: 0, done: false}]
        }
     }

    HandleTodoDone = (id) =>
    { 
        this.setState({
            todos: this.state.todos.map(todo =>
            { 
                if (todo.id === id)
                {
                    todo.done = true;
                }
                return todo;
            })
        });


    };

    render ()
    {
        return (
            <div className="todolist_panel">
                <div className="todolist-container">
                    <h3 className="project-name">Project Name</h3>
                    {
                        this.state.todos.filter(todo => todo.done === false).map( todo => (
                            <Todo key={todo.id} id={todo.id} text={todo.text} priority={todo.priority} onDoneClick={this.HandleTodoDone}/>
                        ))
                    }
                    <div className="add-task-label">
                        <div>
                            <IconContext.Provider value={{color: "#DE4C4A", size: "18px"}}>
                                <div>
                                    <AiOutlinePlus />
                                </div>
                            </IconContext.Provider>
                        </div>
                        <span>Add task</span> 
                    </div>
                    <div className="add-task-panel">

                    </div>
                </div>
            </div>
        )
    }
}

export default Todolist;