import React, {Component} from 'react';
import './Todolist.scss';
import '../Global.scss';
import Todo from './Todo/Todo';
import {AiOutlinePlus} from "react-icons/ai";
import {IconContext} from "react-icons";
import classNames from "classnames";


class Todolist extends Component
{   
    constructor ()
    {
        super();
        this.state = {
            'todos': [{id: 0, text: "Wash the dishes", priority: 1, done: false},
                    {id: 1, text: "Clean up the house", priority: 2, done: false},
                    {id: 2, text: "Add new Layer", priority: 3, done: false},
                {id: 3, text: "Correct all Hard Coded link", priority: 0, done: false}],
            'new_state': null
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

    CollapseNewTaskInput = () =>
    { 
        if (this.state.add_task_open)
        {
            this.setState({'add_task_open': false});
        }
        else 
        {
            this.setState({'add_task_open': true});
        }
    };    

    AddTask = () =>
    { 
        
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
                    <div className={classNames("add-task-label", this.state.add_task_open ? 'hidden' : 'visible')} onClick={this.CollapseNewTaskInput}>
                        <div>
                            <IconContext.Provider value={{color: "#DE4C4A", size: "18px"}}>
                                <div>
                                    <AiOutlinePlus />
                                </div>
                            </IconContext.Provider>
                        </div>
                        <span>Add task</span> 
                    </div>
                    <div className={classNames(this.state.add_task_open? 'visible' : 'hidden')}>
                        <input type="text" placeholder="e.g. Learn Portugese every 2 days #Learning"/>
                        <button type="button" className="red" onClick={this.AddTask}>Add Task</button>
                        <button type="button" onClick={this.CollapseNewTaskInput}>Cancel</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default Todolist;