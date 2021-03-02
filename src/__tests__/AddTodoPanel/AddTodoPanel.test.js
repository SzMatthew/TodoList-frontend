import {shallow, mount} from 'enzyme';
import AddTodoPanel from '../../Todo List/AddTodoPanel/AddTodoPanel';

describe('AddTodoPanel', () => {
    it('Renders', () => {
        const wrapper = shallow(<AddTodoPanel />);
        expect(wrapper).toMatchSnapshot();
    });

    it('Set priority', () => {
        const wrapper = shallow(<AddTodoPanel />);
        wrapper.find('div.priority').first().simulate('click');
        setTimeout(() => {
            expect(wrapper.find('div.priority').first().hasClass('priority-active')).toEqual(true);
        }, 200);
        
    });

    it('Calls "Add TODO" function', () => {
        const AddTodo = jest.fn();
        const wrapper = mount(<AddTodoPanel AddTodo={AddTodo}/>);
        wrapper.find('button').first().simulate('click');
        expect(AddTodo).toBeCalled();
    });
});
