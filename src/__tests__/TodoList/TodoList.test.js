import React from 'react';
import {shallow, mount} from 'enzyme';
import TodoList from '../../Components/Todo List/Todolist';
import Todo from '../../Components/Todo/Todo';

describe('TodoList', () => {
    it('Renders 4 TODOs', () => {
        const wrapper = shallow(<TodoList />);
        expect(wrapper.find(Todo).length).toEqual(4);
    });

    it('Finds Add Task label', () => {
        const wrapper = shallow(<TodoList />);
        expect(wrapper.find('span').text()).toEqual('Add task');
    });

    it('Open Add New Todo Panel', () => {
        const wrapper = mount(<TodoList />);
        wrapper.find('.add-task-label').simulate('click');
        expect(wrapper.find('.add-new-input-wrapper').length).toEqual(1);
    });

    it('Adds a new TODO', () => {
        const wrapper = mount(<TodoList />);
        wrapper.find('.add-task-label').simulate('click');
        wrapper.find('input').simulate('change', {target: {value: 'Test Case'}});
        wrapper.find('button').first().simulate('click');
        expect(wrapper.find(Todo).length).toEqual(5);
    });

    it('Adds a new TODO to ENTER press', () => {
        const wrapper = mount(<TodoList />);
        wrapper.find('.add-task-label').simulate('click');
        wrapper.find('input').simulate('change', {target: {value: 'Test Case'}});
        wrapper.find('input').simulate('keypress', {charCode: 13});
        expect(wrapper.find(Todo).length).toEqual(5);
    });

    it('Don\'t Adds a new TODO to any other key press', () => {
        const wrapper = mount(<TodoList />);
        wrapper.find('.add-task-label').simulate('click');
        wrapper.find('input').simulate('change', {target: {value: 'Test Case'}});
        wrapper.find('input').simulate('keypress', {charCode: 10});
        expect(wrapper.find(Todo).length).toEqual(4);
    });

    it('Set TODO done', () => {
        const wrapper = mount(<TodoList />);
        wrapper.find('.priority').first().simulate('click');
        expect(wrapper.find('.priority').length).toEqual(3);
    });
});
