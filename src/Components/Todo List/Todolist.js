import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import Todo from '../Todo/Todo';
import AddTodoPanel from '../AddTodoPanel/AddTodoPanel';
import NoTodoLabel from '../NoTodoLabel/NoTodoLabel';
import SideNav from '../SideNav/SideNav';
import {AiOutlinePlus} from "react-icons/ai";
import {BsChevronDown} from 'react-icons/bs';
import {GoThreeBars} from 'react-icons/go';
import {IconContext} from "react-icons";
import {setConfiguration, Container, Row, Col} from 'react-grid-system';
import Collapse from 'react-bootstrap/Collapse';
import './Todolist.scss';

setConfiguration({maxScreenClass: 'xxl'});


const Todolist = () => {
    const {id} = useParams();
    const [todos, setTodos] = useState([]);
    const [addTaskOpen, setAddTaskOpen] = useState(false);
    const [isDoneTodosOpen, setDoneTodosOpen] = useState(false);
    const [isSideNavOpen, setSideNavOpen] = useState(false);

    const sortedTodos = [...todos].sort((firstTodo, secondTodo) => (firstTodo.priority > secondTodo.priority) ? 1 : -1);

    useEffect(() => {
        getTodos();
    }, []);

    const getTodos = () => {
        fetch('http://localhost:4000/todos')
            .then(response => response.json())
            .then(data => {
                setTodos(data);
                if (data.filter(todo => todo.done === false).length === 0)
                    setAddTaskOpen(true);
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

    const deleteTodo = (id) => {
        fetch('http://localhost:4000/todos/' + id, {
            method: 'DELETE',
            headers: {'Content-type': 'application/json'},
        })
        .then(res => res.json())
            .then((data) => {
                if (data === true) {
                    getTodos();
                } else {
                    console.error(data);
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
    };

    return (
        <>
            <SideNav isOpen={isSideNavOpen} setSideNavOpen={setSideNavOpen}/>
                    
            <Container fluid className="todolist_panel">
                <IconContext.Provider value={{className: "hamburger-icon", size: "24px"}}>
                    <GoThreeBars onClick={() => setSideNavOpen(!isSideNavOpen)}/>
                </IconContext.Provider>

                <Row justify="center">
                    <Col xxl={5} xl={6} md={7} sm={10} xs={11} className="todolist-container">
                        <h3 className="project-name">TODO List</h3>
                        {
                            sortedTodos.filter(todo => todo.done === false).length
                                ? sortedTodos.filter(todo => todo.done === false).map(todo => (
                                    <Todo key={todo._id} id={todo._id} text={todo.text} priority={todo.priority} onDoneClick={updateTodoDone} onDeleteClick={deleteTodo}/>))
                                : <NoTodoLabel text={'Add new TODOs!'}/>
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

                        <div className="done-todos-row" onClick={() => setDoneTodosOpen(!isDoneTodosOpen)} aria-controls="doneTodosId" aria-expanded={isDoneTodosOpen}>
                            <h4 className="done-todos-label" >Done TODOs</h4>
                            <IconContext.Provider value={{className: isDoneTodosOpen ? "done-todos-arrow-icon upside-down" : "done-todos-arrow-icon"}}>
                                <BsChevronDown />
                            </IconContext.Provider>
                        </div>
                            
                        <Collapse in={isDoneTodosOpen} >
                            <div id="doneTodosId">
                            {
                                sortedTodos.filter(todo => todo.done).length
                                    ? sortedTodos.filter(todo => todo.done).map(todo => 
                                        <Todo key={todo._id} id={todo._id} text={todo.text} priority={todo.priority} onDoneClick={updateTodoDone} onDeleteClick={deleteTodo}/>)
                                    : <NoTodoLabel text={'There is no TODO to list!'}/>
                            }
                            </div>
                        </Collapse>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default Todolist;