import React, {useEffect, useState} from 'react';
import {BsFillFlagFill} from 'react-icons/bs';
import {IconContext} from "react-icons";
import {useRef} from 'react';
import {Row, Col} from 'react-grid-system';
import './AddTodoPanel.scss';

const AddTodoPanel = ({setAddTaskOpen, addTaskOpen, AddTodo}) => {
    const [priority, setPriorty] = useState(0);
    const [newTodo, setNewTodo] = useState('');
    const todoRef = useRef();

    useEffect(() => todoRef.current.focus(), []);

    const AddNewTodo = () => {
        if (newTodo)
        {
            AddTodo(newTodo, priority);
            setNewTodo('');
        }
    }

    return(
        <Row className="add_todo_panel_wrapper">
            <Col xs={12}>
                <Row>
                    <Col lg={9} md={8} sm={12} xs={12}>
                        <input
                            type        = "text"
                            ref         = {todoRef}
                            placeholder = "e.g. Learn Portugese every 2 days"
                            value       = {newTodo}
                            onKeyPress  = {(event) => {if (event.charCode === 13 && newTodo) { AddNewTodo()}}}
                            onChange    = {(event) => setNewTodo(event.target.value)}
                        />
                    </Col>
                    <Col lg={3} md={4} sm={4} xs={6} className="priority-wrapper">
                        <div className={priority === 1 ? 'priority priorty-active' : 'priority'} onClick={() => setPriorty(1)}>
                            <IconContext.Provider value={{color: "#DE4C4A", size: "25px"}}> <BsFillFlagFill /></IconContext.Provider>
                        </div>
                        <div className={priority === 2 ? 'priority priorty-active' : 'priority'} onClick={() => setPriorty(2)}>
                            <IconContext.Provider value={{color: "#FB9814", size: "25px"}}><BsFillFlagFill /></IconContext.Provider>
                        </div>
                        <div className={priority === 3 ? 'priority priorty-active' : 'priority'} onClick={() => setPriorty(3)}>
                            <IconContext.Provider value={{color: "#4271B8", size: "25px"}}><BsFillFlagFill /></IconContext.Provider>
                        </div>
                        <div className={priority === 0 ? 'priority priorty-active' : 'priority'} onClick={() => setPriorty(4)}>
                            <IconContext.Provider value={{color: "#7F7F7F", size: "25px"}}> <BsFillFlagFill /></IconContext.Provider>
                        </div>
                    </Col>
                </Row>
            </Col>
            <Col xs={12}>
                <button type="button" disabled={!newTodo} className="red" onClick={AddNewTodo}>Add Task</button>
                <button type="button" onClick={() => setAddTaskOpen(!addTaskOpen)}>Cancel</button>
            </Col>
        </Row>
    )
}

export default AddTodoPanel;