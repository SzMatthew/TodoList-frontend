import React from 'react';
import {shallow, mount} from 'enzyme';
import AddTodoPanel from '../../Components/AddTodoPanel/AddTodoPanel';

describe('AddTodoPanel', () => {
    it('Renders', () => {
        const wrapper = shallow(<AddTodoPanel />);
        expect(wrapper).toMatchSnapshot();
    });

    it('Set Red priority', () => {
        const wrapper = shallow(<AddTodoPanel />);
        wrapper.find('div.priority').first().simulate('click');
        expect(wrapper.find('div.priority').first().hasClass('priorty-active')).toEqual(true);
    });

    it('Set Orange priority', () => {
        const wrapper = shallow(<AddTodoPanel />);
        wrapper.find('div.priority').at(1).simulate('click');
        expect(wrapper.find('div.priority').at(1).hasClass('priorty-active')).toEqual(true);
    });

    it('Set Blue priority', () => {
        const wrapper = shallow(<AddTodoPanel />);
        wrapper.find('div.priority').at(2).simulate('click');
        expect(wrapper.find('div.priority').at(2).hasClass('priorty-active')).toEqual(true);
    });

    it('Set Grey priority', () => {
        const wrapper = shallow(<AddTodoPanel />);
        wrapper.find('div.priority').at(3).simulate('click');
        expect(wrapper.find('div.priority').at(3).hasClass('priorty-active')).toEqual(true);
    });

    // it('Calls "Add TODO" function', () => {
    //     const AddTodo = jest.fn();
    //     const wrapper = mount(<AddTodoPanel AddTodo={AddTodo}/>);
    //     wrapper.find('button').first().simulate('click');
    //     expect(AddTodo).toBeCalled();
    // });

    it('Close Add Todo panel', () => {
        const setAddTaskOpen = jest.fn();
        const wrapper = shallow(<AddTodoPanel setAddTaskOpen={setAddTaskOpen} addTaskOpen={true}/>);
        wrapper.find('button').at(1).simulate('click');
        expect(wrapper).toEqual({});
    });
});
