import React, {Component} from 'react';
import './Todolist.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import Todo from './Todo/Todo';
import {AiOutlinePlus} from "react-icons/ai";
import { IconContext } from "react-icons";

class Todolist extends Component
{   
    render ()
    {
        let todos = [{id: 0, text: "Wash the dishes", priority: 1}, {id: 1, text: "Clean up the house", priority: 2}, {id: 2, text: "Add new Layer", priority: 3}];

        return (
            <div className="todolist_panel">
                <div className="todolist-container">
                    <h3 className="project-name">Project Name</h3>
                    {
                        todos.map(todo => (
                            <Todo key={todo.id} text={todo.text}/>
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