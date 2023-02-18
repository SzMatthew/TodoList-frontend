import React, { useEffect, useState, useRef } from 'react';
import { useTodoList } from '../../Contexts/todolist-context';
import { useUser } from '../../Contexts/user-context';
import { useParams } from 'react-router-dom';
import Todo from '../Todo/Todo';
import AddTodoPanel from '../AddTodoPanel/AddTodoPanel';
import NoTodoLabel from '../NoTodoLabel/NoTodoLabel';
import SideNav from '../SideNav/SideNav';
import Login from '../Login/Login';
import OpenTodoList from '../OpenTodoList/OpenTodoList';
import ProjectName from '../ProjectName';
import { AiOutlinePlus } from 'react-icons/ai';
import { BsChevronDown } from 'react-icons/bs';
import { GoThreeBars } from 'react-icons/go';
import { IconContext } from 'react-icons';
import { setConfiguration, Container, Row, Col } from 'react-grid-system';
import { toast } from 'react-toastify';
import './Todolist.scss';

setConfiguration({ maxScreenClass: 'xxl' });


const Todolist = () => {
  const { state: { todoList }, setTodoList } = useTodoList();
  const { state: { user }, closeLoginDropDown } = useUser();
  const { projectId } = useParams();
  const [projectTitle, setProjecTitle] = useState('');
  const [addTaskOpen, setAddTaskOpen] = useState(false);
  const [isDoneTodosOpen, setDoneTodosOpen] = useState(false);
  const [isSideNavOpen, setSideNavOpen] = useState(false);
  const [isProjectNameEditable, setProjectNameEditable] = useState(false);
  const [isProjectNameValid, setIsProjectNameValid] = useState(true);
  const projectNameErrorToastId = useRef(null);

  useEffect(() => {
    if (projectId) {
      getTodos();
      setAddTaskOpen(false);
      setDoneTodosOpen(false);
    }
  }, [projectId]);

  const getTodos = () => {
    fetch(`${process.env.REACT_APP_BASE_URL}/todos/getTodosByProjectId?projectId=${projectId}`)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Something went wrong!');
        }})
      .then(data => {
        const sortedTodos = [...data.todos].sort((firstTodo, secondTodo) => (firstTodo.priority >= secondTodo.priority) ? 1 : -1);
        setTodoList(sortedTodos);
        setProjecTitle(data.projectTitle);

        const notDoneTodosLength = data.todos.filter(todo => todo.done === false).length;

        if (notDoneTodosLength === 0)
          setAddTaskOpen(true);
      }).catch(error => {
        console.error(`There is a problem: ${error}`);
        toast.error('Something went wrong!');
      });
  };

  const insertTodo = (newTodo, priority) => {
    let todo = {
      projectId: projectId,
      text: newTodo,
      priority: priority,
      done: false
    };

    fetch(`${process.env.REACT_APP_BASE_URL}/todos`, {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(todo)
    })
      .then(res => res.json())
      .then((data) => {
        if (data._id) {
          getTodos();
        }
      })
      .catch((err) => {console.error(err);});
  };

  const deleteTodo = (id) => {
    fetch(`${process.env.REACT_APP_BASE_URL}/todos/` + id, {
      method: 'DELETE',
      headers: { 'Content-type': 'application/json' },
    })
      .then(res => res.json())
      .then((data) => {
        if (data === true) {
          getTodos();
        } else {
          console.error(data);
        }
      })
      .catch((err) => {console.error(err);});
  };

  const updateTodoDone = (id) => {
    let todoToUpdate = null;

    todoList.map(todo => {
      if (todo._id === id) {
        todo.done = !todo.done;
        todoToUpdate = todo;
      }
    });

    fetch(`${process.env.REACT_APP_BASE_URL}/todos`, {
      method: 'PUT',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(todoToUpdate)
    })
      .then(res => res.json())
      .then((data) => {
        getTodos();
      })
      .catch((err) => {console.error(err);});
  };

  const updateProjectTitle = (projectTitle) => {
    if (!projectTitle) return;

    fetch(`${process.env.REACT_APP_BASE_URL}/projects/updateProjectTitle`, {
      method: 'PUT',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({
        userId: user.userId,
        projectId: projectId,
        projectTitle: projectTitle
      })
    })
      .then(res => res.json())
      .then((data) => {
        setProjecTitle(data.title);
        toast.success('Project name updated successfully!');
      })
      .catch((err) => {
        console.error(err);
        toast.error('Something went wrong!');
      });
  };

  const handleSideNavOutsideClick = () => {
    if (isSideNavOpen)
      setSideNavOpen(false);
  };

  const applyProjectNameEditing = (event, onBlur) => {
    if (onBlur || event.key === 'Enter') {
      if (event.target.value) {
        if (event.target.value !== projectTitle) {
          updateProjectTitle(event.target.value);
        }
        setProjecTitle(event.target.value);
        setProjectNameEditable(!isProjectNameEditable);
        setIsProjectNameValid(true);
      } else if (!event.target.value) {
        if (!toast.isActive(projectNameErrorToastId.current)) {
          projectNameErrorToastId.current = toast.error('Todolist name shouldn\'t be empty');
        }
        event.target.focus();
        setIsProjectNameValid(false);
      }
    }
  };

  return (
    <>
      { user && <SideNav isOpen={isSideNavOpen} setSideNavOpen={setSideNavOpen}/> }
      <Login/>
      <Container fluid className='todolist_panel' onClick={() => {handleSideNavOutsideClick(); closeLoginDropDown();}}>
        {
          user && <IconContext.Provider value={{ className: 'hamburger-icon', size: '30px' }}>
            <GoThreeBars onClick={() => setSideNavOpen(!isSideNavOpen)}/>
          </IconContext.Provider>
        }
        {
          projectId
            ? <Row justify='center'>
              <Col xxl={5} xl={6} md={7} sm={10} xs={11} className='todolist-container'>
                {
                  isProjectNameEditable
                    ? <header className='header'>
                      <input type='text' className={isProjectNameValid ? '' : 'red-border'} defaultValue={projectTitle} onKeyDown={applyProjectNameEditing} onFocus={(event) => event.target.select()} onBlur={(event) => applyProjectNameEditing(event, true)} autoFocus/>
                    </header>
                    : <ProjectName projectTitle={projectTitle} setProjectNameEditable={setProjectNameEditable}/>
                }
                {
                  todoList.filter(todo => todo.done === false).length
                    ? todoList.filter(todo => todo.done === false).map(todo => (
                      <Todo key={todo._id} id={todo._id} text={todo.text} priority={todo.priority} onDoneClick={updateTodoDone} onDeleteClick={deleteTodo}/>))
                    : <NoTodoLabel text={'Add new TODOs!'}/>
                }
                {
                  addTaskOpen
                    ? <AddTodoPanel setAddTaskOpen={setAddTaskOpen} addTaskOpen={addTaskOpen} AddTodo={insertTodo}/>
                    : <div className={'add-task-label'} onClick={() => setAddTaskOpen(!addTaskOpen)}>
                      <IconContext.Provider value={{ color: '#DE4C4A', size: '22px' }}>
                        <AiOutlinePlus />
                      </IconContext.Provider>
                      <span>Add task</span>
                    </div>
                }

                <div className='done-todos-row' onClick={() => setDoneTodosOpen(!isDoneTodosOpen)}>
                  <h4 className='done-todos-label'>Done TODOs</h4>
                  <IconContext.Provider value={{ className: isDoneTodosOpen ? 'done-todos-arrow-icon upside-down' : 'done-todos-arrow-icon' }}>
                    <BsChevronDown />
                  </IconContext.Provider>
                </div>

                <div className={ isDoneTodosOpen ? 'done_todos_panel done_todos_panel--after-open' : 'done_todos_panel done_todos_panel--before-close'} id='doneTodosId'>
                  {
                    todoList.filter(todo => todo.done).length
                      ? todoList.filter(todo => todo.done).map(todo =>
                        <Todo key={todo._id} id={todo._id} text={todo.text} priority={todo.priority} done={todo.done} onDoneClick={updateTodoDone} onDeleteClick={deleteTodo}/>)
                      : <NoTodoLabel text={'There is no TODO to list!'} />
                  }
                </div>
              </Col>
            </Row>
            : <OpenTodoList />
        }
      </Container>
    </>
  );
};

export default Todolist;