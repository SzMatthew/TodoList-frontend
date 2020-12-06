import React, {Component} from 'react';
import {BiCheck} from "react-icons/bi";
import { IconContext } from "react-icons";
import './Todo.scss';

class Todo extends Component {
    render() {
        return (
            <div className="todo">
                <div className="priority ">
                    <IconContext.Provider value={{size: "15px", className: "checked-icon" }}>
                        <div>
                            <BiCheck />
                        </div>
                    </IconContext.Provider>
                </div>
                <span className="todo-text">{this.props.text}</span>
            </div>
    )
    }
}

export default Todo;