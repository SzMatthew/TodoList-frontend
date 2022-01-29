import React, { createContext, useContext, useMemo, useReducer } from 'react';

const TodoListContext = createContext();

const todoListReducer = (state, action) => {
    switch (action.type) {
        case 'SET_TODOLIST': {
            return { todoList: action.payload };
        }
        default: {
            throw new Error(`Unsupported action type: ${action.type}`);
        }
    }
};

const TodoListProvider = props => {
    const [state, dispatch] = useReducer(todoListReducer, {todoList: []});
    const value = useMemo(() => [state, dispatch], [state]);
    return <TodoListContext.Provider value={value} {...props} />;
};

const useTodoList = () => {
    const context = useContext(TodoListContext);

    if (!context) {
        throw new Error('useTodoList must be used within a TodoListProvider');
    }
    const [state, dispatch] = context;

    const setTodoList = todoList => {
        if (state.todoList !== todoList) {
            dispatch({type: 'SET_TODOLIST', payload: todoList});
        }
    };

    return {
        state,
        dispatch,
        setTodoList
    };
};

export { useTodoList, TodoListProvider };