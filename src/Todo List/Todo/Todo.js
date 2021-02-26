import React, {useEffect, useState} from 'react';
import {BiCheck} from "react-icons/bi";
import {IconContext} from "react-icons";
import classNames from "classnames";
import './Todo.scss';

const Todo = ({id, text, priority, onDoneClick}) => {
    const [priorityColor, setPriorityColor] = useState(null);
    const [priorityColorHex, setPriorityColorHex] = useState(null);

    useEffect(() => {
        switch (priority)
        {
            case 1:
                setPriorityColor('red');
                setPriorityColorHex('#DE4C4A');
                break;
            case 2:
                setPriorityColor('yellow');
                setPriorityColorHex('#FB9814');
                break;
            case 3:
                setPriorityColor('blue');
                setPriorityColorHex('#4271B8');

                break;
            default:
                setPriorityColor('grey');
                setPriorityColorHex('#7F7F7F');
        }
    }, []);

    return (
        <div className="todo">
            <div className={classNames('priority', priorityColor)} onClick={() => onDoneClick(id)}>
                <IconContext.Provider value={{size: "16px", color: priorityColorHex ,className: "checked-icon" }}>
                    <div>
                        <BiCheck />
                    </div>
                </IconContext.Provider>
            </div>
            <span className="todo-text">{text}</span>
        </div>
    )
}

export default Todo;