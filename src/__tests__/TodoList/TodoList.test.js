import {shallow, mount} from 'enzyme';
import TodoList from '../../Todo List/Todolist';
import Todo from '../../Todo List/Todo/Todo';

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
});
